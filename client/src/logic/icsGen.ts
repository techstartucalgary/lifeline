import { createEvents, EventAttributes } from "ics";

interface Assessment {
  course:string;
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

function jsonToICS(semester: Course[]): string {
  const events: EventAttributes[] = [];
  for (const course of semester) {
    for (const assessment of course.assessments) {
      const [date, time] = assessment.date.split("T");
      const [year, month, day] = date.split("-");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [hours, minutes, milis] = time.split(":");

      events.push({
        title: `${course.course} ${assessment.name} (${assessment.weight}%)`,
        start: [parseInt(year), parseInt(month), parseInt(day), parseInt(hours), parseInt(minutes)],
        duration: { hours: 0, minutes: 0, seconds: 0 },
      });
    }
  }

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
