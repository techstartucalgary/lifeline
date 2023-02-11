import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavigationDrawer from "../../components/NavigationDrawer";
import AssessmentCard from "../../components/AssessmentCard";
import { classnames, formatDate } from "../../Utilities";
import { Course, Courses } from "../../logic/icsGen";
import styles from "./Review.module.css";

const testState: Courses = [
  {
    code: "PYSC",
    number: 203,
    title: "Psychology",
    key: "psyc-203",
    topic: "Psychology of Everyday Life",
    assessments: [
      {
        name: "Identity Assignment",
        date: "2021-10-21T18:00:00.000",
        dateFormatted: "October 21, 2021 at 18:00",
        weight: "6%",
      },
      {
        name: "Coping Profile Assignment",
        date: "2021-10-29T18:00:00.000",
        dateFormatted: "October 29, 2021 at 18:00",
        weight: "2%",
      },
      {
        name: "Self-Reflection/Goal Setting Assignment",
        date: "2021-12-07T18:00:00.000",
        dateFormatted: "December 7, 2021 at 18:00",
        weight: "7%",
      },
      {
        name: "Experiential-Learning/Article-Evaluation Course Component",
        date: "2021-12-08T23:59:59.999",
        dateFormatted: "December 8, 2021 at 23:59",
        weight: "4%",
      },
      {
        name: "Exam 1",
        date: "2021-10-14T00:00:00.000",
        dateFormatted: "October 14, 2021 at 00:00",
        weight: "25%",
      },
      {
        name: "Exam 2",
        date: "2021-11-18T00:00:00.000",
        dateFormatted: "November 18, 2021 at 00:00",
        weight: "25%",
      },
      {
        name: "Exam 3/Final Exam",
        date: "",
        dateFormatted: "",
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
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Assessments);
  const [courses, setCourses] = useState<Courses>(testState);

  const { courseKey } = useParams();
  const navigate = useNavigate();

  // Callback for when the courses are changed
  const onCoursesChanged = (newCourses: Courses) => {
    for (const course of newCourses) {
      // Numbering undetermined courses
      if (!course.code || !course.number) {
        course.code = "Course";
        course.number = Object.values(courses).length + 1;
        course.title = "Course";
      }

      // Generate the unique course key
      const key = `${course.code}-${course.number}`.toLowerCase();
      course.key = key;
      courses.push(course);
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
  const course = useMemo(
    () =>
      courseKey && courseKey in courseKeyLookup
        ? courseKeyLookup[courseKey]
        : null,
    [courseKey, courseKeyLookup[courseKey || ""]]
  );

  // Redirect to the app page if the course key is invalid
  useEffect(() => {
    if (!courseKey || courseKeyLookup[courseKey] === undefined) {
      navigate("/app");
    }
  }, [courseKey]);

  return (
    <div className="flex flex-row justify-between">
      <nav
        className={classnames(
          "md:w-64",
          "w-full",
          "flex-shrink-0",
          courseKey && "hidden",
          "md:block",
          "bg-gray-100"
        )}
      >
        <NavigationDrawer
          courses={courses}
          currentCourseKey={courseKey}
          onCoursesChanged={onCoursesChanged}
        />
      </nav>
      {course && (
        <main
          className={classnames(
            "flex-shrink-0 text-center w-full",
            styles.main
          )}
        >
          <header className="bg-gray-300 w-full p-4 text-xl">
            <Link to="/app">
              <span
                className={classnames("material-icons", "md:hidden", "inline")}
                style={{ fontSize: "1.5rem", verticalAlign: "middle" }}
              >
                arrow_back
              </span>
            </Link>
            <h1 className="text-4xl">
              {course.title} {course.number}
            </h1>
            <h2 className="text-2xl">{course.topic}</h2>
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
              <ul className="flex flex-col">
                {course.assessments.map((assessment, t) => (
                  <AssessmentCard
                    key={t}
                    assessment={assessment}
                    onAssessmentClick={() => {
                      console.log("clicked");
                    }}
                  />
                ))}
              </ul>
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
