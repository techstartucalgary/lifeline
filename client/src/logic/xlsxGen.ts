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
        course: course.course,
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

//--------------------------------------------------------------

// const XLSX = require("xlsx");

// (async() => {
//   /* fetch JSON data and parse */
//   const url = "https://sheetjs.com/data/executive.json";
//   const raw_data = await (await fetch(url)).json();

//   /* filter for the Presidents */
//   const prez = raw_data.filter(row => row.terms.some(term => term.type === "prez"));

//   /* flatten objects */
//   const rows = prez.map(row => ({
//     name: row.name.first + " " + row.name.last,
//     birthday: row.bio.birthday
//   }));

//   /* generate worksheet and workbook */
//   const worksheet = XLSX.utils.json_to_sheet(rows);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

//   /* fix headers */
//   XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

//   /* calculate column width */
//   const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
//   worksheet["!cols"] = [ { wch: max_width } ];

//   /* create an XLSX file and try to save to Presidents.xlsx */
//   XLSX.writeFile(workbook, "Presidents.xlsx", { compression: true });
// })();