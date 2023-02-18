import { useState, useEffect, useMemo, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import useScrollPosition from "@react-hook/window-scroll";
import NavigationDrawer from "../../components/NavigationDrawer";
import AssessmentCard from "../../components/AssessmentCard";
import { classnames } from "../../Utilities";
import { Course, Courses, Assessment } from "../../logic/icsGen";
import Button from "../../components/Button";
import EditAssessment from "../../components/EditAssessment/EditAssessment";

import CourseInfo from "../../components/CourseInfo";
import AppTopBar from "../../components/AppTopBar";

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
enum Tab {
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
  }, [navRef.current, mainRef.current]);

  // For AppTopBar top height
  const topbarRef = useRef<HTMLDivElement>(null);
  const [topbarHeight, setTopbarHeight] = useState(0);
  useLayoutEffect(() => {
    const onTopbarHeight = () => {
      if (topbarRef.current && mainRef.current) {
        setTopbarHeight(topbarRef.current.offsetHeight);
      }
    };
    onTopbarHeight();
    window.addEventListener("resize", onTopbarHeight);
    return () => window.removeEventListener("resize", onTopbarHeight);
  }, [topbarRef.current, mainRef.current]);

  // For scrolling
  const scrollY = useScrollPosition(120);

  return (
    <>
      <nav
        className={classnames(
          "fixed bg-background z-20 top-0 left-0 w-64",
          currentCourseKey && "hidden",
          "md:block"
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
          <div className="fixed top-0 left-0 right-0 h-fit z-10" ref={topbarRef}>
            <div className="max-w-7xl mx-auto" style={{ paddingLeft: mainMarginLeft }}>
              <AppTopBar
                title={`${currentCourse.title} ${currentCourse.number}`}
                subtitle={currentCourse.topic}
                elevation={scrollY > 0 ? "on-scroll" : "flat"}
              />
            </div>
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
            <div className="flex flex-col md:flex-row" style={{ marginTop: topbarHeight }}>
              {/* Tab */}
              <div className="md:hidden flex flex-row">
                <button
                  className={classnames(
                    "bg-gray-300 p-2",
                    selectedTab === Tab.Assessments && "bg-red-500"
                  )}
                  onClick={() => setSelectedTab(0)}
                >
                  Assessments
                </button>
                <button
                  className={classnames(
                    "bg-gray-300 p-2",
                    selectedTab === Tab.Document && "bg-red-500"
                  )}
                  onClick={() => setSelectedTab(1)}
                >
                  Document
                </button>
              </div>

              {/* Assessments */}
              <section
                className={classnames(
                  "md:w-1/2",
                  "p-4",
                  selectedTab === Tab.Document && "hidden md:block"
                )}
              >
                {editingAssessment === null ? (
                  <>
                    <CourseInfo
                      hours="H(3-2T)"
                      department="Computer Science"
                      description="This course is an introduction to the design and analysis of algorithms. Topics include: algorithmic problem solving, algorithmic efficiency, sorting and searching, divide-and-conquer, greedy algorithms, dynamic programming, and graph algorithms. Prerequisite: CSE 143 or equivalent."
                    />
                    <div
                      className={classnames(
                        "w-full",
                        "flex flex-row",
                        "justify-between",
                        "items-center",
                        "mb-3"
                      )}
                    >
                      <h1 className={classnames("text-sys-primary", "font-bold")}>
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
                  </>
                ) : (
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
