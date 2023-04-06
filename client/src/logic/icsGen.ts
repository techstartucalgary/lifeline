import iCal from "ical-generator";

export interface Assessment {
  name: string;
  date: Date;
  weight: number;
  notes?: string;
  location?: string;
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
  file: string;
}

// rawCourse is the JSON object from the server or from local storage, so Dates and Numbers are strings
export const parseCourse = (rawCourse: {
  code: string;
  number: string;
  title: string;
  key: string;
  topic: string;
  assessments: { name: string; date: string; weight: string }[];
  file: string;
}): Course => {
  const course: Course = {
    ...rawCourse,
    number: Number(rawCourse.number),
    assessments: rawCourse.assessments.map(
      (a: { name: string; date: string; weight: string }) => {
        return {
          name: a.name,
          date: new Date(a.date),
          weight: Number(a.weight) || 0,
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
  const semester = (() => {
    const month = new Date().getMonth();
    if (month >= 8) return "Fall";
    if (month >= 4) return "Spring/Summer";
    return "Winter";
  })();

  const year = new Date().getFullYear();

  const cal = iCal({
    name: `${semester} ${year} Deadlines`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
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
