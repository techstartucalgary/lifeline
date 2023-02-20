import json
import operator
from dateutil import parser
import openpyxl
import itertools
f = open("data/calendar.json")

data = json.load(f)

f.close()

#print(data)

def jsonToXLSX(semester):
    assessments = []
    for course in semester:
        #print(course.get("assessments"))
        for assessment in course.get("assessments"):
            #print(assessment)
            coursename = {"coursename": course['course']}
            assessment = {**coursename, **assessment}
            #print(assessment)
            assessments.append(assessment)
    assessments = sorted(assessments, key=operator.itemgetter('date'))

    for assessment in assessments:
        date = parser.parse(assessment['date'])
        assessment['date'] = date.strftime("%d %B %Y")
    print(assessments)

    wb = openpyxl.Workbook()
  
    # Get workbook active sheet  
    # from the active attribute
    sheet = wb.active
    headers = list(set(itertools.chain.from_iterable(assessments)))
    sheet.append(headers)

    for assessment in assessments:
        sheet.append([assessment.get(h) for h in headers])
    #red_fill = PatternFill(bgColor="FFC7CE")
 #dxf = DifferentialStyle(fill=red_fill)
 #r = Rule(type="expression", dxf=dxf, stopIfTrue=True)
 #r.formula = ['$A2="MATH376"']
 #sheet.conditional_formatting.add("A1:C10", r)


    wb.save("dates.xlsx")


jsonToXLSX(data)
