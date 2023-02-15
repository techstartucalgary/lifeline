import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import NavigationDrawer from "../../components/NavigationDrawer";
import AssessmentCard from "../../components/AssessmentCard";
import { classnames } from "../../Utilities";
import { Course, Courses, Assessment } from "../../logic/icsGen";
import Button from "../../components/Button";

import styles from "./Review.module.css";
import EditAssessment from "../../components/EditAssessment/EditAssessment";

const testState: Courses = [
  {
    code: "TEST",
    number: 999,
    title: "Psychology",
    key: "psyc-203",
    topic: "Psychology of Everyday Life",
    assessments: [
      {
        name: "Identity Assignment",
        date: "2021-10-21T18:00:00.000",
        weight: "6%",
      },
      {
        name: "Coping Profile Assignment",
        date: "2021-10-29T18:00:00.000",
        weight: "2%",
      },
      {
        name: "Self-Reflection/Goal Setting Assignment",
        date: "2021-12-07T18:00:00.000",
        weight: "7%",
      },
      {
        name: "Experiential-Learning/Article-Evaluation Course Component",
        date: "2021-12-08T23:59:59.999",
        weight: "4%",
      },
      {
        name: "Exam 1",
        date: "2021-10-14T00:00:00.000",
        weight: "25%",
      },
      {
        name: "Exam 2",
        date: "2021-11-18T00:00:00.000",
        weight: "25%",
      },
      {
        name: "Exam 3/Final Exam",
        date: "",
        weight: "31%",
      },
    ],
  },
];

// Enum for the tabs
enum Tab {
  Assessments,
  Document,
}

const Review = () => {
  const { courseKey: courseKeyUrlParam } = useParams();

  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Assessments);
  const [courses, setCourses] = useState<Courses>(testState);
  const [currentCourseKey, setCurrentCourseKey] = useState<string | null>(null);
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(
    null
  );

  // At first render of the page, check if the course key is valid
  // and assign value to current course key
  useEffect(() => {
    if (
      courseKeyUrlParam === undefined ||
      courseKeyLookup[courseKeyUrlParam] === undefined
    ) {
      setCurrentCourseKey(null);
    } else {
      setCurrentCourseKey(courseKeyUrlParam);
    }
  }, []);

  // Callback for when the courses are changed
  const onCoursesChanged = (newCourses: Courses) => {
    const existingCourseKeys = courses.map((course) => course.key);
    for (const course of newCourses) {
      // Numbering undetermined courses
      if (!course.code || !course.number) {
        course.code = "Course";
        course.number = Object.values(courses).length + 1;
        course.title = "Course";
      }

      // Generate course key
      const key = `${course.code}-${course.number}`.toLowerCase();
      if (existingCourseKeys.includes(key)) continue;

      course.key = key;
      courses.push(course);
      existingCourseKeys.push(key);
    }

    setCourses([...courses]);
  };

  // Memoize the course key lookup in format of { [key]: course } for performance
  const courseKeyLookup = useMemo(
    () =>
      Object.fromEntries(
        courses.map((course) => [course.key, course])
      ) as Record<string, Course>,
    [courses]
  );

  // Memoize the course based on the course key
  const currentCourse = useMemo(
    () =>
      currentCourseKey && currentCourseKey in courseKeyLookup
        ? courseKeyLookup[currentCourseKey]
        : null,
    [currentCourseKey, courseKeyLookup[currentCourseKey || ""]]
  );

  const onCourseClick = (course: Course | null) => {
    if (course === null) {
      setCurrentCourseKey(null);
      setTimeout(() => history.pushState(null, "", "/app"), 10);
    } else {
      setCurrentCourseKey(course.key);
      setTimeout(() => history.pushState(null, "", `/app/${course.key}`), 100);
    }
  };

  return (
    <div className="flex flex-row justify-between">
      <nav
        className={classnames(
          "md:w-64",
          "w-full",
          "flex-shrink-0",
          currentCourseKey && "hidden",
          "md:block",
          "bg-gray-100"
        )}
      >
        <NavigationDrawer
          courses={courses}
          currentCourse={currentCourse}
          onCoursesChanged={onCoursesChanged}
          onCourseClick={onCourseClick}
        />
      </nav>
      {currentCourse && (
        <main
          className={classnames(
            "flex-shrink-0 text-center w-full",
            styles.main
          )}
        >
          <header className="bg-gray-300 w-full p-4 text-xl">
            <Button onClick={() => onCourseClick(null)}>
              <span
                className={classnames(
                  "material-symbols-outlined",
                  "md:hidden",
                  "inline"
                )}
                style={{ fontSize: "1.5rem", verticalAlign: "middle" }}
              >
                arrow_back
              </span>
            </Button>
            <h1 className="text-4xl">
              {currentCourse.title} {currentCourse.number}
            </h1>
            <h2 className="text-2xl">{currentCourse.topic}</h2>
          </header>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:hidden flex flex-row">
              <button
                className={classnames(
                  "w-full bg-gray-300 p-2",
                  selectedTab === Tab.Assessments && "bg-red-500"
                )}
                onClick={() => setSelectedTab(0)}
              >
                Assessments
              </button>
              <button
                className={classnames(
                  "w-full bg-gray-300 p-2",
                  selectedTab === Tab.Document && "bg-red-500"
                )}
                onClick={() => setSelectedTab(1)}
              >
                Document
              </button>
            </div>
            <section
              className={classnames(
                "w-full",
                "md:w-1/2",
                "border",
                "p-4",
                "h-screen",
                selectedTab === Tab.Document && "hidden md:block"
              )}
            >
              {editingAssessment === null ? (
                <ul className="flex flex-col">
                  {currentCourse.assessments.map((assessment, t) => (
                    <AssessmentCard
                      key={t}
                      assessment={assessment}
                      onAssessmentClick={() => {
                        setEditingAssessment(assessment);
                      }}
                    />
                  ))}
                </ul>
              ) : (
                <EditAssessment
                  assessment={editingAssessment}
                  onClose={() => setEditingAssessment(null)}
                  onSave={() => setEditingAssessment(null)}
                />
              )}
            </section>
            <section
              className={classnames(
                "w-full",
                "md:w-1/2",
                "border",
                "border-gray-300",
                "bg-gray-200",
                "p-4",
                "h-screen",
                selectedTab === Tab.Assessments && "hidden md:block"
              )}
            >
              <img src="../pdf.png" alt="the pdf viewer" />
            </section>
          </div>
        </main>
      )}
      <div className="w-64"></div>
    </div>
  );
};

export default Review;
