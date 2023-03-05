import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { useBeforeUnload, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { config, useBreakpoint } from "../../Utilities";
import { Assessment, Course, Courses, parseCourse } from "../../logic/icsGen";

import CoursePanel from "./CoursePanel";
import NavigationPanel from "./NavigationPanel";
import { transformTemplate, variants } from "./transitions";

const Review = () => {
  const breakpoint = useBreakpoint();

  const [courses, setCourses] = useState<Courses>([]);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const coursesRef = useRef(courses);
  const { courseKey: courseKeyURLParam } = useParams<{
    courseKey: string | undefined;
  }>();

  const deleteCurrentCourse = () => {
    setCourses(
      coursesRef.current.filter((course) => course.key !== currentCourse?.key)
    );
    coursesRef.current = coursesRef.current.filter(
      (course) => course.key !== currentCourse?.key
    );
    setCurrentCourse(null);
  };

  const onCoursesChanged = (newCourse: Course) => {
    if (coursesRef.current.some((course) => course.key === newCourse.key)) {
      console.log("Course already exists");
      // Snackbar here
      return;
    }
    const newCourses = [...coursesRef.current, newCourse];
    setCourses(newCourses);
    coursesRef.current = newCourses;
  };

  // For NavigationDrawer adapting in smaller desktop screens
  const navRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [mainMarginLeft, setMainMarginLeft] = useState(-1);
  useLayoutEffect(() => {
    const onMainMarginLeft = () => {
      const marginLeft = mainRef.current?.offsetLeft || 0;
      const navWidth = navRef.current?.offsetWidth || 0;
      setMainMarginLeft(Math.max(navWidth - marginLeft, 0));

      if (["xs", "sm"].includes(breakpoint)) {
        setMainMarginLeft(0);
      }
    };
    onMainMarginLeft();
    window.addEventListener("resize", onMainMarginLeft);
    return () => window.removeEventListener("resize", onMainMarginLeft);
  }, [navRef.current, mainRef.current, currentCourse, breakpoint]);

  useEffect(() => {
    // Load courses from local storage
    const foundCourses = localStorage.getItem("courses");
    if (!foundCourses) return;

    const parsedCourses: Courses = JSON.parse(foundCourses).map(parseCourse);
    setCourses(parsedCourses);
    coursesRef.current = parsedCourses;

    // Set current course based on URL
    if (courseKeyURLParam) {
      const course = parsedCourses.find(
        (course) => course.key === courseKeyURLParam
      );

      if (course) {
        setCurrentCourse(course);
      }
    }
  }, []);

  useBeforeUnload(
    useCallback(() => {
      localStorage.setItem("courses", JSON.stringify(courses));
    }, [courses])
  );

  useEffect(() => {
    // Update history when current course changes
    if (currentCourse === null) {
      history.pushState(null, "", "/app");
    } else {
      history.pushState(null, "", `/app/${currentCourse.key}`);
    }
  }, [currentCourse]);

  // Callback for select course in navigation drawer
  const onCourseClick = (course: Course) => {
    setCurrentCourse(course);
  };

  // Callback for back arrow in top bar
  const onClickBack = () => {
    setCurrentCourse(null);
  };

  const onChangeAssessment = (assessment: Assessment, index: number) => {
    setCourses(
      courses.map((course) => {
        if (course.key === currentCourse?.key) {
          course.assessments[index] = assessment;
        }
        return course;
      })
    );
  };

  const screens = JSON.parse(JSON.stringify(config.theme?.screens));
  for (const key in screens) {
    screens[key] = parseInt(screens[key]);
  }

  return (
    <div className="overflow-hidden min-h-screen">
      <AnimatePresence mode="popLayout">
        {((["xs", "sm"].includes(breakpoint) && !currentCourse) ||
          !["xs", "sm"].includes(breakpoint)) && (
          <motion.nav
            layout="position"
            key="navigation-panel"
            variants={["xs", "sm"].includes(breakpoint) ? variants : undefined}
            custom={"-4rem"}
            initial="initial"
            animate="enter"
            exit="leave"
            transformTemplate={transformTemplate}
            className="will-change-auto z-20 ease-emphasized"
          >
            <nav
              className="fixed top-0 left-0 w-full md:w-24 xl:w-[17rem] h-full bg-surface z-20"
              ref={navRef}
            >
              <NavigationPanel
                courses={courses}
                currentCourse={currentCourse}
                onCourseClick={onCourseClick}
                onCoursesChanged={onCoursesChanged}
              />
            </nav>
          </motion.nav>
        )}

        {currentCourse && (
          <motion.main
            key={"fty89gft789oijhgy789iuygf"}
            layout="position"
            variants={["xs", "sm"].includes(breakpoint) ? variants : undefined}
            custom={"4rem"}
            initial="initial"
            animate="enter"
            exit="leave"
            transformTemplate={transformTemplate}
            className="w-full will-change-auto ease-emphasized"
          >
            <main className="max-w-9xl mx-auto" ref={mainRef}>
              <CoursePanel
                course={currentCourse}
                left={mainMarginLeft}
                onChangeAssessment={onChangeAssessment}
                onClickBack={onClickBack}
                onDeleteCourse={deleteCurrentCourse}
              />
            </main>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Review;
