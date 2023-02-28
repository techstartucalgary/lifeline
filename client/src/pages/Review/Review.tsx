import { useState, useEffect, useMemo, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { classnames } from "../../Utilities";
import { Assessment, Course, Courses } from "../../logic/icsGen";

import { IconButton } from "../../components/Button";

import AppTopBar, {
  LeadingNavigation,
  TrailingIcon,
  Title,
  Subtitle,
} from "../../components/AppTopBar";
import CoursePanel from "./CoursePanel";

import testState from "./data";
import NavigationPanel from "./NavigationPanel";

const Review = () => {
  const { courseKey: courseKeyUrlParam } = useParams();
  const [courses, setCourses] = useState<Courses>(testState);
  const [currentCourseKey, setCurrentCourseKey] = useState<string | null>(null);
  const coursesRef = useRef(courses);

  // For NavigationDrawer adapting in smaller desktop screens
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
    // Gives a warning that they will lose their progress if the user tries to leave/refresh the page
    const beforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, []);

  useEffect(() => {
    if (currentCourseKey === null) {
      setTimeout(() => history.pushState(null, "", "/app"), 10);
    } else {
      setTimeout(
        () => history.pushState(null, "", `/app/${currentCourseKey}`),
        10
      );
    }
  }, [currentCourseKey]);

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

  // Callback for select course in navigation drawer
  const onCourseClick = (course: Course | null) => {
    if (course === null) {
      setCurrentCourseKey(null);
    } else {
      setCurrentCourseKey(course.key);
    }
  };

  // Callback for when the courses are changed
  const onCoursesChanged = (course: Course) => {
    // const existingCourseKeys = courses.map((course) => course.key);
    // // Numbering undetermined courses
    // if (!course.code || !course.number) {
    //   course.code = "Course";
    //   course.number = Object.values(courses).length + 1;
    //   course.title = "Course";
    // }

    // // Generate course key
    // const key = `${course.code}-${course.number}`.toLowerCase();
    // if (existingCourseKeys.includes(key)) return;

    // course.key = key;
    // existingCourseKeys.push(key);

    const newCourses = [...courses, course];
    setCourses(newCourses);
    coursesRef.current = newCourses;
  };

  const onClickBack = () => setCurrentCourseKey(null);

  const onChangeAssessment = (assessment: Assessment, index: number) => {
    setCourses(
      courses.map((course) => {
        if (course.key === currentCourseKey) {
          course.assessments[index] = assessment;
        }
        return course;
      })
    );
  };

  const deleteCurrentCourse = () => {
    setCourses(coursesRef.current.filter((course) => course.key !== currentCourseKey));
    setCurrentCourseKey(null);
    coursesRef.current = coursesRef.current.filter(
      (course) => course.key !== currentCourseKey
    );
  };

  return (
    <>
      <nav
        className={classnames(
          "fixed top-0 left-0 w-full md:w-24 xl:w-[17rem] h-full bg-surface",
          currentCourseKey && "hidden",
          "md:block z-20"
        )}
        ref={navRef}
      >
        <NavigationPanel
          courses={courses}
          currentCourse={currentCourse}
          onCourseClick={onCourseClick}
          onCoursesChanged={onCoursesChanged}
        />
      </nav>
      {currentCourse && (
        <>
          <div className="z-10">
            <AppTopBar
              className="max-w-7xl mx-auto"
              style={{ paddingLeft: mainMarginLeft }}
            >
              {/* Icons */}
              <LeadingNavigation className="block md:hidden">
                <IconButton
                  className="text-on-surface"
                  icon="arrow_back"
                  onClick={onClickBack}
                />
              </LeadingNavigation>
              <TrailingIcon>
                <IconButton
                  className="text-on-surface-variant hidden md:block"
                  icon="error"
                />
                <IconButton
                  className="text-on-surface-variant hidden md:block"
                  icon="delete"
                  onClick={deleteCurrentCourse}
                />
                <IconButton
                  className="text-on-surface-variant block md:hidden"
                  icon="more_vert"
                />
              </TrailingIcon>

              {/* Titles */}
              <Title>
                {currentCourse.title} {currentCourse.number}
              </Title>
              <Subtitle>{currentCourse.topic}</Subtitle>
            </AppTopBar>
          </div>

          <main
            className={classnames(
              "max-w-7xl mx-auto relative",
              mainMarginLeft < 0 && "hidden"
            )}
            ref={mainRef}
            style={{ paddingLeft: mainMarginLeft }}
          >
            <CoursePanel
              course={currentCourse}
              onChangeAssessment={onChangeAssessment}
            />
          </main>
        </>
      )}
    </>
  );
};

export default Review;
