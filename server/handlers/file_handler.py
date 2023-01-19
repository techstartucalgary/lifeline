"""Handles the file upload and extraction of text from the file"""

import shutil
from pathlib import Path
from tempfile import NamedTemporaryFile
from pdfminer.high_level import extract_text
from fastapi import UploadFile


def save_upload_file_tmp(upload_file: UploadFile):
    """Handles creating a temp and returns the temporary path for it"""
    try:
        suffix = Path(upload_file.filename).suffix
        with NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            shutil.copyfileobj(upload_file.file, tmp)
            tmp_path = Path(tmp.name)
    finally:
        upload_file.file.close()
    return tmp_path


def handle_upload_file(upload_file: UploadFile):
    """Handles generating text from the file uploaded and returns it as json"""
    extracted_text = ""
    tmp_path = save_upload_file_tmp(upload_file)
    try:
        extracted_text = extract_text(tmp_path)  # Do something with the saved temp file
    finally:
        tmp_path.unlink()  # Delete the temp file
    return {"text": extracted_text}
