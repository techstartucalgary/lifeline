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

// rawCourse is the JSON object from the server or from local storage, so Dates and Numbers are strings
export const parseCourse = (rawCourse: {
  code: string;
  number: string;
  title: string;
  key: string;
  topic: string;
  assessments: { name: string; date: string; weight: string }[];
}): Course => {
  const course: Course = {
    ...rawCourse,
    number: Number(rawCourse.number),
    assessments: rawCourse.assessments.map(
      (a: { name: string; date: string; weight: string }) => {
        return {
          name: a.name,
          date: new Date(a.date),
          weight: Number(a.weight),
        } as Assessment;
      }
    ),
  };

  return course;
};

export interface Courses extends Array<Course> {
  [index: number]: Course;
}

const jsonToICS = (courses: Courses): string => {
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
};

export default jsonToICS;
