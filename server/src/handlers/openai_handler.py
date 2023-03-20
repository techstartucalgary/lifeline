"""Handles the 'premium-files' route which uses the openai api"""

import json
import os

import openai
import pdfplumber
from dotenv.main import load_dotenv
from fastapi import Response, UploadFile, status
from pdfminer.pdfparser import PDFSyntaxError

from .file_handler import get_course_info, get_course_key, save_upload_file_tmp

load_dotenv()

openai.api_key = os.environ.get("OPENAI_API_KEY")


def get_deadlines(file: UploadFile, response: Response):
    """Extracts deadlines from uploaded file using the openai api"""
    course = {}
    try:
        tmp_path = save_upload_file_tmp(file)
        print(f"Processing file: {tmp_path}")
        with pdfplumber.open(tmp_path) as pdf:
            course_code, course_number = get_course_key(pdf)
            course["code"] = course_code
            course["number"] = course_number

            if course_code and course_number:
                course_key = f"{course_code} {course_number}"
                course_info = get_course_info(course_key)
                if course_info is not None:
                    course = {**course, **course_info}

            full_text = ""
            for page in pdf.pages:
                full_text += page.extract_text()
            print(full_text)

        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": """You are an algorithm designed to extract deadlines from text.
The input text is scraped from a pdf, so it is possible that the format will be strange.
Your responses will be parsed into an array of Typescript objects implementing the following interface:
interface Assessment {
    name: string;
    date: Date;
    weight?: number;`
    notes?: string;`
}
Date is a string in the format YYYY-MM-DDTHH:MM:SS.000Z.
The response MUST follow this format: Assessment[].
""",
                },
                {
                    "role": "user",
                    "content": "Extract the deadlines from the following text:\n\
                        All assignments are worth 10 percent of your final grade\n\
                        Assignment 2 due on 2020-10-30 at 11:59pm\n\
                        Assignment 3 is due a week after Assignment 2 and late submissions \
                              will receive a full letter grade penalty\n",
                },
                {
                    "role": "assistant",
                    "content": """
[
    {
        "name": "Assignment 2",
        "date": "2020-10-30T23:59:00.000Z",
        "weight": "10",
    },
    {
        "name": "Assignment 3",
        "date": "2020-11-06T23:59:00.000Z",
        "weight": "10",
        "notes": "Late submissions will receive a full letter grade penalty",
    }      
]
""",
                },
                {
                    "role": "user",
                    "content": f'Extract deadlines from the following text:\n"{full_text}"',
                },
            ],
        )
        print(completion.choices[0].message.content)
        assessments = json.loads(completion.choices[0].message.content)
        course["assessments"] = assessments

        return course
    except PDFSyntaxError:
        response.status_code = status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
        return {"detail": "Unsupported file type"}
    finally:
        if tmp_path:
            tmp_path.unlink()
