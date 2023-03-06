""" Returns XLSX file from json"""
import operator
from dateutil import parser
import openpyxl
from starlette.responses import FileResponse
def get_xlsx_file(semester):
    """Converts JSON to xlsx file"""
    assessments = []
    for course in semester:
        for assessment in course.get("assessments"):
            coursename = {"coursename": course['course']}
            name = {"assessment":assessment['name']}
            date = {"date": assessment['date']}
            weight = {"weight": assessment['weight']}
            assessment = {**coursename,**name,**date,**weight}
            assessments.append(assessment)
    assessments = sorted(assessments, key=operator.itemgetter('date'))
    for assessment in assessments:
        date = parser.parse(assessment['date'])
        assessment['date'] = date.strftime("%d %B %Y")

    work_book = openpyxl.Workbook()
    sheet = work_book.active
    headers = list(assessments[0].keys())
    sheet.append(headers)
    for assessment in assessments:
        sheet.append([assessment.get(h) for h in headers])
    work_book.save("deadlines.xlsx")
    print("Returning file now")
    return FileResponse("deadlines.xlsx",media_type='application/octet-stream',
    filename="deadlines.xlsx")
    