"""Entry point for the server"""

from os import environ
from typing import List
import uvicorn

from fastapi import FastAPI, File, UploadFile, Response, Request

from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from handlers import calendar_handler, file_handler
from handlers import xlsx_handler

app = FastAPI()
handler = Mangum(app)


origins = (
    ["https://lifeline.techstartucalgary.com"]
    if "LAMBDA_TASK_ROOT" in environ
    else ["http://localhost:3000", "http://127.0.0.1:3000"]
)

print(origins)

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

@app.get("/xlsx")
async def get_xlsx(info: Request):
    """ Returns the generated XLSX file """
    semester = await info.json()
    return xlsx_handler.get_xlsx_file(semester)

    

if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000)
