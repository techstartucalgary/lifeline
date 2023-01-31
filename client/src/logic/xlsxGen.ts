import XLSX from "xlsx";
import { Course, Assessment } from "../types";

interface Row extends Assessment {
  course: string;
  complete: string;
}

function jsonToXLSX(semester: Course[]): void {
  const rows: Row[] = [];

  for (const course of semester) {
    for (const assessment of course.assessments) {
      rows.push({
        course: course.name,
        ...assessment,
        complete: ""
      });
    }
  }

  rows.sort((a: Assessment, b: Assessment) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateA.getTime() - dateB.getTime();
  });

  const headers = [
    "Course",
    "Name",
    "Date",
    "Weight",
    "Complete",
  ];

  const data = rows.map((row: Row) => {
    return [
      row.course,
      row.name,
      new Date(row.date).toLocaleDateString(),
      `${row.weight}%`,
      row.complete,
    ];
  });

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "deadlines");

  // download the file
  XLSX.writeFile(workbook, "deadlines.xlsx");
}

export default jsonToXLSX;
