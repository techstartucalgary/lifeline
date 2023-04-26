"""Handles the file upload and extraction of assessments from the file"""

import hashlib
import json
import pickle
import shutil
from collections import defaultdict
from datetime import datetime
from pathlib import Path
from tempfile import NamedTemporaryFile
from typing import Dict, List, Optional, Set

import pdfplumber
from dateparser.search import search_dates
from fastapi import Response, UploadFile, status
from pdfminer.pdfparser import PDFSyntaxError

from .openai_api_handler import get_assessments_from_text
from .db_handler import insert_course_into_db, query_course_from_db

def handle_file(file: UploadFile, response: Response, premium: bool = False):
    """Handles one file"""
    try:
        tmp_path = save_temp_file(file)
        print(f"Processing file: {tmp_path}")

        print("First checking if a cached version of the course is present")
        file_hash = get_file_hash(tmp_path)
        print(f"The file hash is: {file_hash}")

        print("Querying the DB")
        cached_course = query_course_from_db(file_hash)
        if cached_course is not None:
            print("Found cached course for this file hash. Returning it.")
            return cached_course

        print("Couldn't find a cached version. Processing the file as usual.")
        # Processing only if we don't have a cached version available
        with pdfplumber.open(tmp_path) as pdf:
            course = get_course_info(pdf)

            if premium:
                assessments = get_assessments_from_text(pdf)
            else:
                assessments = get_assessments_from_tables(pdf)

            course["assessments"] = assessments
        print(f"Finished processing file: {tmp_path}")
    except PDFSyntaxError as ex:
        print(f"Error processing file: {ex}")
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        return {"Error processing file": ex.args}
    finally:
        if tmp_path:
            tmp_path.unlink()

    print("Caching the course for future use")
    insert_course_into_db(file_hash, json.dumps(course))
    return course


def save_temp_file(upload_file: UploadFile):
    """Handles creating a temp and returns the temporary path for it"""
    try:
        suffix = Path(upload_file.filename).suffix
        with NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            shutil.copyfileobj(upload_file.file, tmp)
            tmp_path = Path(tmp.name)
    finally:
        upload_file.file.close()
    return tmp_path


def get_file_hash(file_path: Path):
    """Returns sha256 based on the file contents"""
    contents = b""

    # Reading just the first two pages (about 40kb) of a pdf for getting the sha
    with open(file_path, "rb") as file:
        contents = file.read(40000)

    # Getting the hash
    sha256 = hashlib.sha256(contents).hexdigest()
    return sha256


def load_course_codes() -> Set[str]:
    """
    Returns a set of all course codes
    supported course codes taken from
    https://www.ucalgary.ca/pubs/calendar/current/course-desc-main.html
    """
    with open("./data/course_codes.pkl", "rb") as file:
        course_codes = pickle.load(file)
    return course_codes


COURSE_CODES = load_course_codes()


def load_course_info() -> defaultdict:
    """
    Returns a dictionary of course info for all courses
    """
    faculties: defaultdict = defaultdict(lambda: None)
    course_codes: defaultdict = defaultdict(lambda: None)
    course_infos: defaultdict = defaultdict(lambda: None)

    with open("./data/faculty.jsonlines", "rb") as file:
        faculties_raw = [json.loads(line) for line in file]

        for faculty in faculties_raw:
            fid = faculty["fid"]
            faculties[fid] = faculty

    with open("./data/course-code.jsonlines", "rb") as file:
        course_codes_raw = [json.loads(line) for line in file]

        for code in course_codes_raw:
            fid = code["faculty"]
            code["faculty"] = faculties[fid]
            course_codes[code["code"]] = code

    with open("./data/course-info.jsonlines", "rb") as file:
        course_infos_raw = [json.loads(line) for line in file]

        for info in course_infos_raw:
            code = info["code"]
            number = info["number"]
            key = f"{code} {number}"
            code = course_codes[code]

            if not code:
                continue
            info["title"] = code["title"]
            info["faculty"] = code["faculty"]

            course_infos[key] = info
    return course_infos


COURSE_INFOS = load_course_info()


def get_course_key(pdf: pdfplumber.pdf.PDF):
    """Attempts to get the course name from the first page of the pdf
    by matching words against the list of course codes"""
    first_page_words = pdf.pages[0].extract_text().split()

    course_number = None
    course_code = None

    for index, word in enumerate(first_page_words):
        if word in COURSE_CODES:
            course_code = word
            potential_course_number = first_page_words[index + 1]
            try:
                course_number = int(potential_course_number.strip(".,"))
            except ValueError:
                pass
            break

    return course_code, course_number


def get_course_info(pdf: pdfplumber.pdf.PDF):
    """Retrieves data other than assessments from the pdf and adds it to the course"""
    course = {}

    course_code, course_number = get_course_key(pdf)
    course["code"] = course_code
    course["number"] = course_number

    if course_code and course_number:
        course_key = f"{course_code} {course_number}"
        course_info = COURSE_INFOS[course_key]
        if course_info is not None:
            course = {**course, **course_info}
    return course


def get_assessments_from_tables(pdf: pdfplumber.pdf.PDF):
    """Extracts assessments from all tables in a pdf"""
    assessments = []
    tables = get_all_tables(pdf)
    for table in tables:
        print("Extracting assessments from table")
        assessments.extend(extract_assessments(table))
    return assessments


def get_all_tables(pdf: pdfplumber.pdf.PDF) -> List[List[List[Optional[str]]]]:
    """Returns all tables in a pdf as a list of 2d lists"""
    tables = []
    print("pdf.pages", pdf.pages)
    for page in pdf.pages:
        print("Extracting tables from page", page.page_number)
        tables += page.extract_tables()

    print("Found", len(tables), "tables")
    return tables


def extract_assessments(table: List[List[Optional[str]]]) -> List[Dict]:
    """Returns the assessments in a table by identifying a date
    in a cell and using the text in the first cell as the name"""
    assessments = []
    for row in table:
        for cell in row:
            if not cell:  # skip empty cells
                continue

            date: Optional[datetime] = None
            source: Optional[str] = None
            # first try dateparser
            dates = search_dates(cell, settings={"REQUIRE_PARTS": ["day", "month"]})
            if not dates:
                continue
            source, date = dates[0]

            if len(source) < 5:
                # Ignore dates that are too short to avoid false positives.
                # The shortest a date can realistically be is 5 characters. e.g. Dec 1
                continue

            # use the text in the first cell as the name if it exists
            name = row[0].replace("\n", " ") if row[0] else "Unknown"

            weight = 0
            for cell in row:
                if cell and "%" in cell:
                    try:
                        weight = int(cell.strip("%"))
                    except ValueError:
                        pass

            assessments.append(
                {
                    "name": name,
                    "date": date.strftime("%Y-%m-%dT%H:%M:%S"),
                    "weight": weight,
                    "source": source,  # use this to highlight the date in the pdf
                }
            )
            # move to the next row to avoid double counting
            break
    return assessments


def subtract_text(pdf: pdfplumber.pdf.PDF):
    """Returns all plain text contained within pdf with the exception of the tables"""
    # Extract the text on the page
    full_text = ""
    for page in pdf.pages:
        page_text = page.extract_text()
        if not page_text:
            continue
        full_text += page_text + "\n"
        # Extract the table boundaries
        table_bboxes = [table.bbox for table in page.find_tables()]
        # Remove the text within the table boundaries
        print("The table bbox length of list is", len(table_bboxes))
        # While there are still table coordinates, continue to crop
        if table_bboxes:
            cropped_text_blocks = []
            for bbox in table_bboxes:
                cropped_text_blocks.append(page.crop(bbox).extract_text() + "\n")
                for text_block in cropped_text_blocks:
                    full_text = full_text.replace(text_block, "")
    return full_text
