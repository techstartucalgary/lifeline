"""Handles the 'premium-files' route which uses the openai api"""

import json
import os

import openai
from transformers import GPT2Tokenizer

MAX_TOKENS = 3000  # needs to account for the system prompt

openai.api_key = os.getenv("OPENAI_API_KEY")


def split(text):
    """Divides the text into chunks of at most MAX_TOKENS tokens"""
    tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
    tokens = tokenizer.encode(text)
    chunks = []
    for i in range(0, len(tokens), MAX_TOKENS):
        chunks.append(tokenizer.decode(tokens[i : i + MAX_TOKENS]))
    return chunks


def get_assessments(text):
    """Returns the extracted deadlines from the text using the openai api"""
    print(f"\n\nSending request to openai api: \n\n{text[:100]}...\n\n")

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": """
You are an algorithm designed to extract deadlines from text.
The input text is scraped from a pdf, so use common sense to correct potential errors.""",
            },
            {
                "role": "user",
                "content": """Extract the deadlines from the following text:
All assignments are worth 10 percent of your final grade
Assignment 2 due on 2020-10-30 at 11:59pm
Assignment 3 is due a week after Assignment 2 and late submissions
will receive a full letter grade penalty""",
            },
            {
                "role": "assistant",
                "content": json.dumps(
                    [
                        {
                            "name": "Assignment 2",
                            "date": "2020-10-30T23:59:00.000Z",
                            "weight": 10,
                            "source": "Assignment 2 due on 2020-10-30 at 11:59pm",
                        },
                        {
                            "name": "Assignment 3",
                            "date": "2020-11-06T23:59:00.000Z",
                            "weight": 10,
                            "source": "Assignment 3 is due a week after Assignment 2",
                            "notes": "Late submission will receive a full letter grade penalty",
                        },
                    ]
                ),
            },
            {
                "role": "user",
                "content": """
Your responses will be parsed into an array of Typescript objects implementing the following interface:
interface Assessment {
    name: string; // the name of the assessment
    date: Date; // the date of the assessment YYYY-MM-DDTHH:MM:SS.000Z
    source: string; // the verbatim string that was used to extract the deadline
    weight?: number; // the weight of the assessment (optional)
    notes?: string; // any additional notes (optional)
}
If there are no deadlines, simply respond '[]'.
Extract deadlines from the following text:
"""
                + text,
            },
        ],
    )
    if completion.choices[0].finish_reason != "stop":
        print("Openai api did not finish")  # TODO: upgrade to log level warning
        print(completion)
        return []
    try:
        assessments = json.loads(completion.choices[0].message.content)
        print(f"Openai api response: \n\n{json.dumps(assessments, indent=2)}\n\n")
    except json.JSONDecodeError:  # this will catch any unexpected response from the openai api
        print(f"Bad api response: {completion}")
        assessments = []

    return assessments


def get_assessments_from_text(pdf):
    """Processes a pdf and returns the assessments found in it"""
    full_text = ""
    for page in pdf.pages:
        full_text += page.extract_text()
    print("Text extracted from pdf")

    chunks = split(full_text)
    print(f"Split text into {len(chunks)} chunks")

    assessments = []
    for chunk in chunks:
        assessments += get_assessments(chunk)

    print(f"Found {len(assessments)} assessments")
    return assessments
