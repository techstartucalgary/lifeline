import { createEvents, EventAttributes } from "ics";

export interface Assessment {
  name: string;
  date: string;
  weight: string;
}

export interface Course {
  course: string;
  topic: string;
  assessments: Assessment[];
}

export interface CourseData {
  topic: string;
  assessments: Assessment[];
}

export interface Response {
  [key: string]: CourseData;
}

function jsonToICS(data: Response): string {
  const events: EventAttributes[] = [];
  Object.entries(data).forEach(([course, courseData]) => {
    for (const assessment of courseData.assessments) {
      const [date, time] = assessment.date.split("T");
      const [year, month, day] = date.split("-");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [hours, minutes, milis] = time.split(":");

      events.push({
        title: `${course} ${assessment.name} (${assessment.weight}%)`,
        start: [parseInt(year), parseInt(month), parseInt(day), parseInt(hours), parseInt(minutes)],
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
