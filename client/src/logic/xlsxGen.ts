import { createEvents, EventAttributes } from "ics";
import XLSX from "xlsx";
require("xlsx");

interface Assessment {
  course: string;
  name: string;
  date: string;
  weight: string;
  complete: string;
}

export interface Course {
  course: string;
  topic: string;
  assessments: Assessment[];
}

function jsonToXLSX(semester: Course[]): Blob {
  let assessments = [];
  for (const course of semester) {
    for (const assessment of course.assessments) {
      //Add course field to json
      assessment.course = course.course;
      assessment.complete = "";
      //var d = new Date(assessment.date)
      //assessment.date = d.toDateString();
      assessments.push(assessment);
    }
  }
  function sortAssessment(a: Assessment , b: Assessment) : number{
    if(a.date < b.date) {
      return -1;
    } else {
      return 1;
    }
  }
  assessments = assessments.sort(sortAssessment); 
  const workbook = XLSX.utils.book_new();
  
  
  const worksheet = XLSX.utils.json_to_sheet(assessments);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Assessments");
  const blob = new Blob([XLSX.write(workbook, {
    type: "array",
    bookType: "xlsx",
  })],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",});
  return blob;

  
}

export default jsonToXLSX;
