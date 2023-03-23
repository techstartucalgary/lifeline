"""Entry point for the server. You can run this file directly to start the server locally."""

from os import environ
from typing import List

import uvicorn
from dotenv.main import load_dotenv
from fastapi import FastAPI, File, Response, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
import os

from handlers import calendar_handler, file_handler, xlsx_handler

IS_IN_PROD = "LAMBDA_TASK_ROOT" in dict(environ)

load_dotenv()

app = FastAPI(
    title="Lifeline Server",
    description="Server for the Lifeline project",
    version="0.1.0",
    docs_url="/docs" if not IS_IN_PROD else None,
    redoc_url="/redoc" if not IS_IN_PROD else None,
)
handler = Mangum(app)  # required for AWS Lambda


origins = (
    ["https://lifeline.techstartucalgary.com"]
    if IS_IN_PROD
    else ["http://localhost:3000", "http://127.0.0.1:3000"]
)
print(f"Allowed origins: {origins}")


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/test-calendar-json")
async def show_calendar():
    """sends a test json to client"""
    return calendar_handler.get_calendar_json()


@app.post("/files", status_code=200)
async def get_deadlines(response: Response, outline_file: UploadFile = File(...)):
    """Returns the extracted dates and info from the uploaded file"""
    file_size = os.fstat(outline_file.file.fileno()).st_size
    if file_size > 150000:
        raise HTTPException(status_code=413, detail="File size exceeds 150kb")
    # outline_file.file.seek(0, os.SEEK_END)
    # file_size = outline_file.file.tell()
    # outline_file.file.seek(0)
    # file_size = outline_file.content_length
    # file_size = 0
    # while True:
    #     data = await outline_file.read(1024)
    #     if not data:
    #         break
    # file_size += len(data)

    if file_size > 150000:
        raise HTTPException(status_code=413, detail="File size exceeds 150kb")
    return file_handler.handle_file(outline_file, response)


@app.post("/premium-files", status_code=200)
async def premium_get_deadlines(response: Response, outline_file: UploadFile = File(...)):
    """Returns the extracted dates and info from the uploaded file, uses the openai api"""
    return file_handler.handle_file(outline_file, response, premium=True)


@app.post("/xlsx")
async def get_xlsx(semester: List[dict]):
    """Takes as input an array of JSON objects, each containing a course code and list
    of assessments like in ./data/calendar.json.
    Returns an XLSX file which is a to-do list for the assessments"""
    return xlsx_handler.get_xlsx_file(semester)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
