"""Handles the file upload and extraction of assessments from the file"""

from collections import defaultdict
import json
import shutil
from pathlib import Path
import pickle
from tempfile import NamedTemporaryFile
from typing import List
from fastapi import UploadFile
import pdfplumber
from datefinder import find_dates
from dateparser.search import search_dates


# supported course codes taken from
# https://www.ucalgary.ca/pubs/calendar/current/course-desc-main.html


def cache_course_codes():
    """
    Returns a list of all course codes
    """
    with open("./data/course_codes.pkl", "rb") as file:
        course_codes = pickle.load(file)
    return course_codes


COURSE_CODES = cache_course_codes()


def cache_course_info():
    """
    Returns a dictionary of course info for all courses
    """
    faculties = defaultdict(lambda: None)
    course_codes = defaultdict(lambda: None)
    course_infos = defaultdict(lambda: None)

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

            info["title"] = code["title"]
            info["faculty"] = code["faculty"]

            course_infos[key] = info
    return course_infos


COURSE_INFOS = cache_course_info()


def get_course_key(pdf):
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


def get_course_info(course_key):
    """Returns the course info for a given course key"""
    return COURSE_INFOS[course_key]


def read_tables(pdf):
    """Returns all tables in a pdf as a list of 2d lists"""
    tables = []
    for page in pdf.pages:
        tables.extend(page.extract_tables())
    return tables


def extract_assessments(table):
    """Returns the assessments in a table by identifying a date
    in a cell and using the text in the first cell as the name"""
    assessments = []
    for row in table:
        for cell in row:
            if not cell:  # skip empty cells
                continue
            # first try dateparser
            dates = search_dates(
                cell, languages=["en"], settings={"REQUIRE_PARTS": ["day", "month"]}
            )
            if dates:
                source, date = dates[0]
            else:  # try datefinder if dateparser fails
                dates = list(find_dates(cell, source=True))
                if dates:
                    date, source = dates[0]
            if not dates:
                continue

            if len(source) < 5:
                # Ignore dates that are too short to avoid false positives.
                # The shortest a date can realistically be is 5 characters. e.g. Dec 1
                continue

            # use the text in the first cell as the name if it exists
            name = row[0].replace("\n", " ") if row[0] else "Unknown"

            weight = "unknown"
            for cell in row:
                if cell and "%" in cell:
                    weight = cell

            assessments.append(
                {
                    "name": name,
                    "date": date.strftime("%Y-%m-%dT%H:%M:%S.%f"),
                    "weight": weight,
                    "source": source,  # use this to highlight the date in the pdf
                }
            )
            # move to the next row to avoid double counting
            break
    return assessments


def get_course(tmp_path):
    """Compiles assessments into the correct format and returns
    the body of the response"""

    with pdfplumber.open(tmp_path) as pdf:
        course = {}

        # Extract course code and number from the first page
        course_code, course_number = get_course_key(pdf)
        course["code"] = course_code
        course["number"] = course_number

        if course_code and course_number:
            course_key = f"{course_code} {course_number}"
            course_info = get_course_info(course_key)
            course = {**course, **course_info}

        # Extract assessments from all tables
        assessments = []
        tables = read_tables(pdf)
        for table in tables:
            assessments.extend(extract_assessments(table))
        course["assessments"] = assessments

    return course


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


def handle_files(files: List[UploadFile]):
    """Handles multiple files"""
    courses = []
    for file in files:
        try:
            tmp_path = save_upload_file_tmp(file)
            course = get_course(tmp_path)
            courses.append(course)
        finally:
            tmp_path.unlink()

    return courses
