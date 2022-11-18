from math import inf
from typing import List
from pdfminer.high_level import extract_text
from datefinder import find_dates
import sys
import json
import datetime


def get_dates_from_pdf(course):
    file_path = f"test-data/{course}/{course}.pdf"
    text = extract_text(file_path)
    # dates = list(find_dates(text))
    dates: List[datetime.datetime] = []
    # use find_dates(text)
    

    # new_dates: List[datetime.datetime] = [d for d in dates]

    # filter extraneous dates

    latest = datetime.datetime(2024, 1, 1)
    earliest = datetime.datetime(2020, 1, 1)

    for i, date in enumerate(dates):
        try:
            if date > latest or date < earliest:  # TODO: fix type warning
            
                dates.pop(i)
        except TypeError:
            dates.pop(i)

    return dates


def get_dates_from_json(course):
    file_path = f"test-data/{course}/{course}.json"
    with open(file_path, "r") as f:
        data = f.read()

    data = json.loads(data)

    dates = []

    for assessment in data["assessments"]:
        if assessment["date"] != "TBD" and assessment["date"] != "ONGOING":
            # convert string to datetime object
            date = datetime.datetime.strptime(
                assessment["date"], "%Y-%m-%dT%H:%M:%S.%f")
            dates.append(date)

    return dates


dates_from_json = get_dates_from_json(sys.argv[1])
dates_from_pdf = get_dates_from_pdf(sys.argv[1])

# print("PDF:")
# for date in dates_from_pdf:
#     print(date)

# print("JSON:")
# for date in dates_from_json:
#     print(date)

# count the number of dates that are the same
count = 0
for date1 in dates_from_json:
    dist = datetime.timedelta(99999999)
    for date2 in dates_from_pdf:
        dist = min(dist, abs(date1 - date2))

    threshold = datetime.timedelta(days=1)
    if dist < threshold:
        count += 1

print(f"Number of dates from json: {len(dates_from_json)}")
print(f"Number of dates from pdf: {len(dates_from_pdf)}")
print(f"Number of dates that are the same: {count}")
print(f"Coverage: {count / len(dates_from_json)}")


# for date in dates_from_json:
#     if date.day in [d.day for d in dates_from_pdf]:
#         count += 1

# print(f"Number of dates from json: {len(dates_from_json)}")
# print(f"Number of dates from pdf: {len(dates_from_pdf)}")
# print(f"Number of dates that are the same: {count}")
