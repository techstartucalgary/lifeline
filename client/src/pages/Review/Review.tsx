/* eslint-disable no-restricted-globals */
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { useBeforeUnload, useParams } from "react-router-dom";

import { useBreakpoint } from "../../Utilities";
import { Dropzone } from "../../components/Dropzone";
import { Assessment, Course, Courses, parseCourse } from "../../logic/icsGen";

import CoursePanel from "./CoursePanel";
import NavigationPanel from "./NavigationPanel";
import { transformTemplate, variants } from "./transitions";

const Review = () => {
  const [loading, setLoading] = useState<string[]>([]);
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

  const onOutlineUpload = async (files: File[]) => {
    setLoading(files.map((f: File) => f.name));

    while (files.length > 0) {
      const file = files.pop();
      if (!file) continue;

      const formData = new FormData();
      formData.append("outline_file", file as File);

      await axios
        .post("/files", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data)
        .then((data) => {
          const course: Course = parseCourse(data);
          course.code = course.code || "Course";
          course.number = course.number || courses.length + 1;
          course.title = course.title || course.code;
          course.key = `${course.code.toLowerCase()}-${course.number}`;
          course.file = file;

          onCoursesChanged(course);
          setCurrentCourse(course);
        })
        .catch((error) => {
          console.log(error);
          alert("Error uploading file");
        })
        .finally(() => {
          setLoading((prev) => prev.filter((f) => f !== file?.name));
        });
    }
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

      if (isMobile()) {
        setMainMarginLeft(0);
      }
    };
    onMainMarginLeft();
    window.addEventListener("resize", onMainMarginLeft);
    return () => window.removeEventListener("resize", onMainMarginLeft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [courseKeyURLParam]);

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

  const isMobile = () => ["xs", "sm"].includes(breakpoint);

  return (
    <div className="overflow-hidden min-h-screen">
      <AnimatePresence mode="popLayout">
        {((isMobile() && !currentCourse) || !isMobile()) && (
          <motion.nav
            layout="position"
            key="navigation-panel"
            variants={isMobile() ? variants : undefined}
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
                onOutlineUpload={(e) => {
                  if (!e.target.files) return;
                  const files = Array.from(e.target.files);
                  onOutlineUpload(files);
                }}
                loading={loading}
              />
            </nav>
          </motion.nav>
        )}

        {currentCourse && (
          <motion.main
            key={"fty89gft789oijhgy789iuygf"}
            layout="position"
            variants={isMobile() ? variants : undefined}
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
        {!currentCourse && !isMobile() && (
          <div className="max-w-9xl mx-auto h-screen" ref={mainRef}>
            <Dropzone onDrop={onOutlineUpload} isLoading={loading.length > 0} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Review;
