"""Handles the file upload and extraction of assessments from the file"""

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


def get_course_name(path):
    """Attempts to get the course name from the first page of the pdf
    by matching words against the list of course codes"""
    with pdfplumber.open(path) as pdf:
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


def read_tables(path):
    """Returns all tables in a pdf as a list of 2d lists"""
    with pdfplumber.open(path) as pdf:
        tables = []
        for page in pdf.pages:
            tables.extend(page.extract_tables())
    with pdfplumber.open(path) as pdf:
        full_text = ""
        for page_num in range(len(pdf.pages)):
            text = pdf.pages[page_num].extract_text().split()
            full_text += '\n' + str(text)

    # Retrieving the coordinates of the tables in pdf so we can avoid it 
    cropped_text = ""
    ts = {
        "vertical_strategy": "lines",
        "horizontal_strategy": "lines",
    }

def subtract_tables(path):
    """Returns all plain text contained within pdf with the exception of the tables"""
    # Retreving all of the content of the pdf 
    with pdfplumber.open(path) as pdf:
        full_text = ""
        for page_num in range(len(pdf.pages)):
            text = pdf.pages[page_num].extract_text().split()
            full_text += '\n' + str(text)

    # Retrieving the coordinates of the tables in pdf so we can avoid it 
    cropped_text = ""
    ts = {
        "vertical_strategy": "lines",
        "horizontal_strategy": "lines",
    }

    bboxes = [table.bbox for table in pdf.find_tables(table_settings=ts)] # Will contain list of (x0, top, x1, bottom)

    # Cropping the pdf such that the tables are only retained 
    for coor in range(len(bboxes)):
        for page_num in range(len(pdf.pages)):
            table_text = pdf.pages[page_num].crop(bboxes[coor]).extract_text().split()
            cropped_text += "\n" + str(table_text)
    
    # Replacing the final text with the tables taken out 
    final_text = full_text.replace(cropped_text, " ")

    print("The text without the tables", final_text)

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
            name = row[0]  # use the text in the first cell as the name
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
    tables = read_tables(tmp_path)

    assessments = []
    for table in tables:
        assessments.extend(extract_assessments(table))

    result = {
        "course": get_course_name(tmp_path),
        "topic": "unknown topic",  # will get this later
        "assessments": assessments,
    }
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
