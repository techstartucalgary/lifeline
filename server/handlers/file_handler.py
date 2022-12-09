from pdfminer.high_level import extract_text
import shutil
from pathlib import Path
from tempfile import NamedTemporaryFile
from fastapi import UploadFile

# Handles creating a temp and returns the temporary path for it
def save_upload_file_tmp(upload_file: UploadFile):
    try:
        suffix = Path(upload_file.filename).suffix
        with NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            shutil.copyfileobj(upload_file.file, tmp)
            tmp_path = Path(tmp.name)
    finally:
        upload_file.file.close()
    return tmp_path

# Handles generating text from the file uploaded and returns it as json
def handle_upload_file(upload_file: UploadFile):
    extracted_text = ""
    tmp_path = save_upload_file_tmp(upload_file)
    try:
        extracted_text = extract_text(tmp_path) # Do something with the saved temp file
    finally:
        tmp_path.unlink()  # Delete the temp file
    return {"text": extracted_text }

