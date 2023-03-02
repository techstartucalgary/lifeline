import { createEvents, EventAttributes } from "ics";

export interface Assessment {
  name: string;
  date: Date;
  weight: number;
  notes?: string;
}

export interface Course {
  code: string;
  number: number;
  title: string;
  key: string;
  topic: string;
  assessments: Assessment[];
  description?: string;
  faculty?: { title: string };
  hours?: string;
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
      const year = assessment.date.getFullYear();
      const month = assessment.date.getMonth();
      const day = assessment.date.getDate();
      const hours = assessment.date.getHours();
      const minutes = assessment.date.getMinutes();

      events.push({
        title: `${course.code} ${course.number} - ${assessment.name} (${assessment.weight}%)`,
        start: [year, month, day, hours, minutes],
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
