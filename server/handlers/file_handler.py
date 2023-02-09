"""Handles the file upload and extraction of assessments from the file"""

from collections import defaultdict
import json
import shutil
from pathlib import Path
import pickle
from tempfile import NamedTemporaryFile
from fastapi import UploadFile
import pdfplumber
from datefinder import find_dates
from dateparser.search import search_dates


# supported course codes taken from
# https://www.ucalgary.ca/pubs/calendar/current/course-desc-main.html
with open("./data/course_codes.pkl", "rb") as file:
    course_codes = pickle.load(file)


def cache_course_info():
    with open("./data/faculty.jsonlines", "rb") as file:
        faculties_raw = [json.loads(line) for line in file]
        faculties = defaultdict(lambda: None)

        for f in faculties_raw:
            fid = f["fid"]
            faculties[fid] = f

    with open("./data/course-code.jsonlines", "rb") as file:
        course_codes_raw = [json.loads(line) for line in file]
        course_codes = defaultdict(lambda: None)

        for cc in course_codes_raw:
            fid = cc["faculty"]
            cc["faculty"] = faculties[fid]
            course_codes[cc["code"]] = cc

    with open("./data/course-info.jsonlines", "rb") as file:
        course_infos_raw = [json.loads(line) for line in file]
        course_infos = defaultdict(lambda: None)

        for ci in course_infos_raw:
            code = ci["code"]
            number = ci["number"]
            key = f"{code} {number}"
            cc = course_codes[code]

            ci["title"] = cc["title"]
            ci["faculty"] = cc["faculty"]

            course_infos[key] = ci
    return course_infos


COURSE_INFOS = cache_course_info()


def get_course_key(pdf):
    """Attempts to get the course name from the first page of the pdf
    by matching words against the list of course codes"""
    first_page_words = pdf.pages[0].extract_text().split()

    course_number = None
    course_code = None

    for index, word in enumerate(first_page_words):
        if word in course_codes:
            course_code = word
            potential_course_number = first_page_words[index + 1]
            try:
                course_number = int(potential_course_number.strip(".,"))
            except ValueError:
                pass
            break

    if course_number:
        return f"{course_code} {course_number}"
    if course_code:
        return course_code
    return "unknown course"


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
            name = row[0].replace(
                "\n", " "
            )  # use the text in the first cell as the name

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


def get_response(tmp_path):
    """Compiles assessments into the correct format and returns
    the body of the response"""

    with pdfplumber.open(tmp_path) as pdf:
        tables = read_tables(pdf)

        assessments = []
        for table in tables:
            assessments.extend(extract_assessments(table))

        course_key = get_course_key(pdf)
        course_info = get_course_info(course_key)

        course_info["assessments"] = assessments
        result = course_info
    return result


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
    """Main function for handling the post request"""
    tmp_path = save_upload_file_tmp(upload_file)
    try:
        response = get_response(tmp_path)
    finally:
        tmp_path.unlink()  # Delete the temp file
    return response
