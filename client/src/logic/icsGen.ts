import { createEvents, EventAttributes } from "ics";

export interface Assessment {
  name: string;
  date: string;
  weight: string;
}

export interface Course {
  code: string;
  number: number;
  title: string;
  key: string;
  topic: string;
  assessments: Assessment[];
}

export interface Courses extends Array<Course> {
  [index: number]: Course;
}

function jsonToICS(courses: Courses): string {
  const events: EventAttributes[] = [];

  for (const course of courses) {
    for (const assessment of course.assessments) {
      if (!assessment.date) {
        continue;
      }
      const [date, time] = assessment.date.split("T");
      const [year, month, day] = date.split("-");
      const [hours, minutes, ] = time.split(":");

      events.push({
        title: `${course.code} ${course.number} - ${assessment.name} (${assessment.weight}%)`,
        start: [
          parseInt(year),
          parseInt(month),
          parseInt(day),
          parseInt(hours),
          parseInt(minutes),
        ],
        duration: { hours: 0, minutes: 0, seconds: 0 },
      });
    }
  }

  const { value } = createEvents(events);
  if (value) {
    return value;
  }
  return "error";
}

export default jsonToICS;
