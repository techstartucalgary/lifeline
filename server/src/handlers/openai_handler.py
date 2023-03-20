"""Handles the 'premium-files' route which uses the openai api"""

import json
import os

import openai
import pdfplumber
from dotenv.main import load_dotenv
from fastapi import Response, UploadFile, status
from pdfminer.pdfparser import PDFSyntaxError
from transformers import GPT2Tokenizer

from .file_handler import get_course_info, get_course_key, save_upload_file_tmp

MAX_TOKENS = 4096
load_dotenv()

openai.api_key = os.environ.get("OPENAI_API_KEY")


def process_file(file: UploadFile, response: Response):
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
            print("Text extracted from pdf")

        chunks = split(full_text)
        print(f"Chunks: {len(chunks)}")

        assessments = []
        for chunk in chunks:
            assessments += get_assessments(chunk)

        course["assessments"] = assessments

        return course
    except PDFSyntaxError:
        response.status_code = status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
        return {"detail": "Unsupported file type"}
    finally:
        if tmp_path:
            tmp_path.unlink()


def split(text):
    """Divides the text into chunks of MAX_TOKENS tokens"""
    tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
    tokens = tokenizer.encode(text)
    chunks = []
    for i in range(0, len(tokens), MAX_TOKENS):
        chunks.append(tokenizer.decode(tokens[i : i + MAX_TOKENS]))
    return chunks


def get_assessments(text):
    """Returns the extracted deadlines from the text using the openai api"""
    with open("handlers/system-prompt.txt", "r", encoding="utf-8") as file:
        system_prompt = file.read()

    print(f"\n\nSending request to openai api: \n\n{text[:100]}...\n\n")

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": system_prompt,
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
                "content": json.dumps(
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
                            "notes": "Late submission will receive a full letter grade penalty",
                        },
                    ]
                ),
            },
            {
                "role": "user",
                "content": f'Extract deadlines from the following text:\n"{text}"',
            },
        ],
    )
    try:
        assessments = json.loads(completion.choices[0].message.content)
        print(f"Openai api response: \n\n{json.dumps(assessments, indent=2)}\n\n")
    except json.JSONDecodeError:  # this will catch any unexpected response from the openai api
        print(f"Bad api response: {completion}")
        assessments = []

    return assessments
