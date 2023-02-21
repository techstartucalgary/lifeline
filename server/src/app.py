"""Entry point for the server"""

from os import environ
from typing import List
import uvicorn
from fastapi import FastAPI, File, UploadFile, Response
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from handlers import calendar_handler, file_handler

prod = "LAMBDA_TASK_ROOT" in environ

app = FastAPI(
    title="Lifeline Server",
    description="Server for the Lifeline project",
    version="0.1.0",
    docs_url="/docs" if not prod else None,
    redoc_url="/redoc" if not prod else None,
)
handler = Mangum(app)


origins = (
    ["https://lifeline.techstartucalgary.com"]
    if prod
    else ["http://localhost:3000", "http://127.0.0.1:3000"]
)


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
async def get_deadlines(response: Response, outline_files: List[UploadFile] = File(...)):
    """Returns the extracted dates from the uploaded file(s)"""
    return file_handler.handle_files(outline_files, response)


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000)
