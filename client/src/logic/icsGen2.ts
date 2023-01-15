// const ics = require("ics"); // this causes an error Line 1:13:  Require statement not part of import statement  @typescript-eslint/no-var-requires
// how to fix this?
import { createEvents, EventAttributes } from "ics";

const semester = [
  {
    "course": "PSYC 203",
    "topic": "Psychology of Everyday Life",
    "assessments": [
      {
        "name": "Identity Assignment",
        "date": "2021-10-21T18:00:00.000",
        "weight": "6"
      },
      {
        "name": "Coping Profile Assignment",
        "date": "2021-10-29T18:00:00.000",
        "weight": "2"
      },
      {
        "name": "Self-Reflection/Goal Setting Assignment",
        "date": "2021-12-7T18:00:00.000",
        "weight": "7"
      },
      {
        "name": "Experiential-Learning/Article-Evaluation Course Component",
        "date": "2021-12-8T23:59:59.999",
        "weight": "4"
      },
      {
        "name": "Exam 1",
        "date": "2021-10-14T00:00:00.000",
        "weight": "25"
      },
      {
        "name": "Exam 2",
        "date": "2021-11-18T00:00:00.000",
        "weight": "25"
      }
    ]
  },
  {
    "course": "HTST 209",
    "topic": "The History of China",
    "assessments": [
      {
        "name": "Midterm examination",
        "date": "2022-02-28T00:00:00.000",
        "weight": "45"
      },
      {
        "name": "Term essay",
        "date": "2022-04-04T00:00:00.000",
        "weight": "35"
      },
      {
        "name": "Final examination",
        "date": "2022-04-09T00:00:00.000",
        "weight": "20"
      },
    ]
  }

];

interface Assessment {
  name: string;
  date: string;
  weight: string;
}

// schema to represent course
export interface Course {
  course: string;
  topic: string;
  assessments: Assessment[];
}

function jsonToICS(semester: Course[]): string {
  const events: EventAttributes[] = [];
  for (const course of semester) {
    for (const assessment of course.assessments) {
      const [date, time] = assessment.date.split("T");
      const [year, month, day] = date.split("-");
      const [hours, minutes, milis] = time.split(":");

      events.push({
        title: `${course.course} ${assessment.name} (${assessment.weight}%)`,
        start: [parseInt(year), parseInt(month), parseInt(day), parseInt(hours), parseInt(minutes)],
        duration: { hours: 0, minutes: 0, seconds: 0 },
      });
    }
  }
  
  createEvents(events, (error, value) => {
    if (error) {
      console.log(error);
      return "error";
    }
    console.log(value);
    return value;
  });
  return "";
}

export default jsonToICS;

