import { useState, useEffect, useMemo, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { classnames } from "../../Utilities";
import { Course, Courses, Assessment } from "../../logic/icsGen";

import NavigationDrawer from "../../components/NavigationDrawer";
import AssessmentCard from "../../components/AssessmentCard";
import { Button, IconButton } from "../../components/Button";
import EditAssessment from "../../components/EditAssessment/EditAssessment";

import CourseInfo from "../../components/CourseInfo";
import AppTopBar, { LeadingNavigation, TrailingIcon , Title, Subtitle } from "../../components/AppTopBar";
import Tabs from "../../components/Tabs/Tabs";

const testState: Courses = [
  {
    code: "PSYC",
    number: 203,
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
export enum Tab {
  Assessments,
  Document,
}

const Review = () => {
  const { courseKey: courseKeyUrlParam } = useParams();

  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Assessments);
  const [courses, setCourses] = useState<Courses>(testState);
  const [currentCourseKey, setCurrentCourseKey] = useState<string | null>(null);
  const [editingAssessment, setEditingAssessment] = useState<{
    assessment: Assessment;
    index: number;
  } | null>(null);

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

  useEffect(() => {
    setEditingAssessment(null);
  }, [currentCourseKey]);

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

  // Memorize the course key lookup in format of { [key]: course } for performance
  const courseKeyLookup = useMemo(
    () =>
      Object.fromEntries(
        courses.map((course) => [course.key, course])
      ) as Record<string, Course>,
    [courses]
  );

  // Memorize the course based on the course key
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

  // For NavigationDrawer adapt in smaller desktop screens
  const navRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [mainMarginLeft, setMainMarginLeft] = useState(-1);
  useLayoutEffect(() => {
    const onMainMarginLeft = () => {
      if (navRef.current && mainRef.current) {
        const marginLeft = mainRef.current.offsetLeft || 0;
        const navWidth = navRef.current?.offsetWidth || 0;
        setMainMarginLeft(Math.max(navWidth - marginLeft, 0));
      }
    };
    onMainMarginLeft();
    window.addEventListener("resize", onMainMarginLeft);
    return () => window.removeEventListener("resize", onMainMarginLeft);
  }, [navRef.current, mainRef.current, currentCourseKey]);

  const onClickReturn = () => setCurrentCourseKey(null);

  return (
    <>
      <nav
        className={classnames(
          "fixed top-0 left-0 w-full bg-slate-500 md:w-64",
          currentCourseKey && "hidden",
          "md:block z-20"
        )}
        ref={navRef}
      >
        <NavigationDrawer
          courses={courses}
          currentCourse={currentCourse}
          onCoursesChanged={onCoursesChanged}
          onCourseClick={onCourseClick}
        />
      </nav>
      {currentCourse && (
        <>
          {/* App top bar */}
          <div className="--fixed top-0 left-0 right-0 h-fit z-10">
            <AppTopBar className="max-w-7xl mx-auto" style={{ paddingLeft: mainMarginLeft }}>
              {/* Icons */}
              <LeadingNavigation className="block md:hidden">
                <IconButton className="text-on-surface" icon="arrow_back" onClick={onClickReturn} />
              </LeadingNavigation>
              <TrailingIcon>
                <IconButton className="text-on-surface-variant hidden md:block" icon="error" />
                <IconButton className="text-on-surface-variant hidden md:block" icon="delete" />
                <IconButton className="text-on-surface-variant block md:hidden" icon="more_vert" />
              </TrailingIcon >

              {/* Titles */}
              <Title>{currentCourse.title} {currentCourse.number}</Title>
              <Subtitle>{currentCourse.topic}</Subtitle>
            </AppTopBar>
          </div>
          
          <main
            className={classnames(
              "max-w-7xl mx-auto relative",
              (mainMarginLeft < 0) && "hidden"
            )}
            ref={mainRef}
            style={{ paddingLeft: mainMarginLeft }}
          >
            {/* Course page */}
            <div className="flex flex-col md:flex-row">
              <section
                className={classnames(
                  "w-full",
                  "md:w-1/2",
                  "p-4"
                )}
              >
                <CourseInfo
                  hours="H(3-2T)"
                  department="Computer Science"
                  description="This course is an introduction to the design and analysis of algorithms. Topics include: algorithmic problem solving, algorithmic efficiency, sorting and searching, divide-and-conquer, greedy algorithms, dynamic programming, and graph algorithms. Prerequisite: CSE 143 or equivalent."
                />
                <Tabs
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
                {editingAssessment === null ? (
                  <div
                    className={classnames(
                      selectedTab === Tab.Document && "hidden md:block",
                      "w-full"
                    )}
                  >
                    <div
                      className={classnames(
                        "hidden",
                        "md:flex",
                        "md:flex-row",
                        "w-full",
                        "justify-between",
                        "items-center",
                        "mb-3"
                      )}
                    >
                      <h1
                        className={classnames("text-sys-primary", "font-bold")}
                      >
                        ASSESSMENTS
                      </h1>
                      <Button
                        variant="filled"
                        className={classnames("px-5", "py-2")}
                      >
                        <span
                          className={classnames(
                            "material-symbols-outlined",
                            "text-4xl"
                          )}
                        >
                          add
                        </span>
                      </Button>
                    </div>
                    <ul className="flex flex-col">
                      {currentCourse.assessments.map((assessment, index) => (
                        <AssessmentCard
                          key={index}
                          assessment={assessment}
                          onAssessmentClick={() => {
                            setEditingAssessment({ assessment, index });
                          }}
                        />
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className={classnames(selectedTab === Tab.Document && "hidden md:block")}>
                    <EditAssessment
                      assessment={editingAssessment.assessment}
                      onClose={() => setEditingAssessment(null)}
                      onSave={(newAssessment: Assessment) => {
                        setCourses(
                          courses.map((course) => {
                            if (course.key === currentCourseKey) {
                              course.assessments[editingAssessment.index] =
                                newAssessment;
                            }
                            return course;
                          })
                        );
                        setEditingAssessment(null);
                      }}
                    />
                  </div>
                )}
              </section>

              {/* Document */}
              <section
                className={classnames(
                  "w-full",
                  "md:w-1/2",
                  "p-4",
                  selectedTab === Tab.Assessments && "hidden md:block"
                )}
              >
                <img
                  src="../pdf.png"
                  alt="the pdf viewer"
                  className={classnames(
                    "border-x",
                    "border-y",
                    "border-dashed",
                    "border-gray-400",
                    "rounded-3xl",
                    "w-full",
                    "mt-2"
                  )}
                />
              </section>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Review;