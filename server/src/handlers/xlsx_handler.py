
import operator
import itertools
from dateutil import parser
import openpyxl
from starlette.responses import FileResponse
def get_xlsx_file(semester):
    """Converts JSON to xlsx file"""
    #convert json to xl file
    #return a 'FileResponse' with the excel file that was just created
    assessments = []
    for course in semester:
        # print(course.get("assessments"))
        for assessment in course.get("assessments"):
            # print(assessment)
            coursename = {"coursename": course['course']}
            assessment = {**coursename, **assessment}
            # print(assessment)
            assessments.append(assessment)
    assessments = sorted(assessments, key=operator.itemgetter('date'))

    for assessment in assessments:
        date = parser.parse(assessment['date'])
        assessment['date'] = date.strftime("%d %B %Y")
    print(assessments)

    work_book = openpyxl.Workbook()

    # Get workbook active sheet
    # from the active attribute
    sheet = work_book.active
    headers = list(set(itertools.chain.from_iterable(assessments)))
    sheet.append(headers)

    for assessment in assessments:
        sheet.append([assessment.get(h) for h in headers])
    # red_fill = PatternFill(bgColor="FFC7CE")
    # dxf = DifferentialStyle(fill=red_fill)
    # r = Rule(type="expression", dxf=dxf, stopIfTrue=True)
    # r.formula = ['$A2="MATH376"']
    # sheet.conditional_formatting.add("A1:C10", r)

    work_book.save("dates.xlsx")
    print("Returning file now")
    return FileResponse("dates.xlsx",media_type='application/octet-stream',filename="dates.xlsx")
    

