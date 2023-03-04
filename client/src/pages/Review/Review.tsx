import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { useBeforeUnload, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { createBreakpoint } from "react-use";

import { classnames, config } from "../../Utilities";
import { Assessment, Course, Courses, parseCourse } from "../../logic/icsGen";

import CoursePanel from "./CoursePanel";
import NavigationPanel from "./NavigationPanel";

const Review = () => {
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
      if (navRef.current && mainRef.current) {
        const marginLeft = mainRef.current.offsetLeft || 0;
        const navWidth = navRef.current?.offsetWidth || 0;
        setMainMarginLeft(Math.max(navWidth - marginLeft, 0));
      }
    };
    onMainMarginLeft();
    window.addEventListener("resize", onMainMarginLeft);
    return () => window.removeEventListener("resize", onMainMarginLeft);
  }, [navRef.current, mainRef.current, currentCourse]);

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

  const useBreakpoint = createBreakpoint(screens);
  const breakpoint = useBreakpoint();

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="popLayout">
        {((["xs", "sm"].includes(breakpoint) && !currentCourse) ||
          breakpoint !== "sm") && (
          <motion.nav
            key="navigation-panel"
            initial={{
              x: ["xs", "sm"].includes(breakpoint) ? -30 : 0,
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: ["xs", "sm"].includes(breakpoint) ? -30 : 0,
              opacity: 0,
            }}
            transition={{ duration: 0.6, ease: [0.2, 0.0, 0, 1.0] }}
            className={classnames(
              "fixed top-0 left-0 w-full md:w-24 xl:w-[17rem] h-full bg-surface",
              currentCourse && "hidden", // For mobile
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
          </motion.nav>
        )}

        {currentCourse && (
          <motion.main
            className="max-w-9xl mx-auto relative overflow-hidden"
            ref={mainRef}
            key={"fty89gft789oijhgy789iuygf"}
            initial={{
              x: ["xs", "sm"].includes(breakpoint) ? 30 : 0,
              y: ["xs", "sm"].includes(breakpoint) ? 0 : 30,
              opacity: 0,
            }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{
              x: ["xs", "sm"].includes(breakpoint) ? 30 : 0,
              y: ["xs", "sm"].includes(breakpoint) ? 0 : 30,
              opacity: 0,
            }}
            transition={{ duration: 0.6, ease: [0.2, 0.0, 0, 1.0] }}
          >
            <CoursePanel
              course={currentCourse}
              left={mainMarginLeft}
              onChangeAssessment={onChangeAssessment}
              onClickBack={onClickBack}
              onDeleteCourse={deleteCurrentCourse}
            />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Review;
