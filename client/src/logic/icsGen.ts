import { createEvents, EventAttributes } from "ics";

export interface Assessment {
  name: string;
  date: string;
  weight: string;
}

export interface Course {
  topic: string;
  assessments: Assessment[];
}

export interface Courses {
  [key: string]: Course;
}

function jsonToICS(data: Courses): string {
  const events: EventAttributes[] = [];
  Object.entries(data).forEach(([course, courseData]) => {
    for (const assessment of courseData.assessments) {
      if (!assessment.date) {
        continue;
      }
      const [date, time] = assessment.date.split("T");
      const [year, month, day] = date.split("-");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [hours, minutes, milis] = time.split(":");

      events.push({
        title: `${course} ${assessment.name} (${assessment.weight}%)`,
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
  });

  const { error, value } = createEvents(events);
  if (error) {
    return "error";
  }
  if (value) {
    return value;
  }
  return "error";
}

export default jsonToICS;
