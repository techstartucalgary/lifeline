import iCal from "ical-generator";

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
  file: File;
}

// rawCourse is the JSON object from the server or from local storage, so Dates and Numbers are strings
export const parseCourse = (rawCourse: {
  code: string;
  number: string;
  title: string;
  key: string;
  topic: string;
  assessments: { name: string; date: string; weight: string }[];
  file: File;
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
  const cal = iCal({
    name: "My Deadlines",
    timezone: "America/Edmonton",
  });

  for (const course of courses) {
    for (const assessment of course.assessments) {
      cal.createEvent({
        start: assessment.date,
        end: assessment.date,
        summary: `${course.code} ${course.number} ${assessment.name}`,
        description: assessment.notes,
      });
    }
  }

  return cal.toString();
};

export default jsonToICS;
