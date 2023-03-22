"""Handles the 'premium-files' route which uses the openai api"""

import json
import os
from concurrent.futures import ThreadPoolExecutor

import openai
from transformers import GPT2Tokenizer

MAX_TOKENS = 3000  # needs to account for the system prompt

openai.api_key = os.getenv("OPENAI_API_KEY")
executor = ThreadPoolExecutor(max_workers=4)


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
    print(f"\nSending request to openai api: \n{text[:100]}...\n")

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
Assignment 2 due on 2020-10-30 at 11:59pm and late submissions
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
                        }
                    ]
                ),
            },
            {
                "role": "user",
                "content": """
Extract deadlines from the following text.
Your response must be in this format:
{
    name: string; // the name of the assessment
    date: Date; // the date of the assessment YYYY-MM-DDTHH:MM:SS.000Z
    weight?: number; // the weight of the assessment (optional)
}[]
If there are no deadlines, simply respond '[]'.
Text:
"""
                + text,
            },
        ],
    )
    print(f"Openai api response finish reason: {completion.choices[0].finish_reason}\n")

    if completion.choices[0].finish_reason != "stop":
        print("Openai api did not finish")
        print(completion)
        return []
    try:
        assessments = json.loads(completion.choices[0].message.content)
        # print(f"Openai api response: \n\n{json.dumps(assessments, indent=2)}\n\n")
    except json.JSONDecodeError:  # this will catch any unexpected response from the openai api
        print(f"Bad api response: {completion}")
        assessments = []
    return assessments


def get_assessments_from_text(pdf):
    """Returns the extracted deadlines from the text using the openai api"""
    full_text = ""
    for page in pdf.pages:
        full_text += page.extract_text()
    print("Extracted text from pdf")

    chunks = split(full_text)
    print(f"Split text into {len(chunks)} chunks")

    tasks = [executor.submit(get_assessments, chunk) for chunk in chunks]

    assessments = []
    for task in tasks:
        assessments += task.result()

    print(json.dumps(assessments, indent=4))
    return assessments
