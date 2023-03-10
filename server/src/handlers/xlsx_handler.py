"""Handles the /xlsx endpoint"""
import operator
from tempfile import NamedTemporaryFile
from pathlib import Path
from dateutil import parser
import openpyxl
from fastapi.responses import FileResponse


def get_xlsx_file(semester):
    """Converts JSON to xlsx file"""

    assessments = []
    for course in semester:
        for assessment in course.get("assessments"):
            coursename = {"COURSE": course["course"]}
            name = {"ASSESSMENT": assessment["name"]}
            date = {"DATE": assessment["date"]}
            weight = {"WEIGHT": assessment["weight"]}
            assessment = {**coursename, **name, **date, **weight}
            assessments.append(assessment)

    assessments = sorted(assessments, key=operator.itemgetter("DATE"))

    for assessment in assessments:
        date = parser.parse(assessment["DATE"])
        assessment["DATE"] = date.strftime("%B %d, %Y")

    print(assessments)
    work_book = openpyxl.Workbook()
    sheet = work_book.active
    headers = list(assessments[0].keys())
    sheet.append(headers)

    for assessment in assessments:
        sheet.append([assessment.get(h) for h in headers])

    with NamedTemporaryFile(delete=False, suffix=".xlsx") as tmp:
        work_book.save(tmp.name)
        tmp_path = Path(tmp.name)

    print("Returning file now")
    return FileResponse(
        tmp_path,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename="deadlines.xlsx",
    )
