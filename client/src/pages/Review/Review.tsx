import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffectOnce, useList, useUpdateEffect } from "react-use";

import { useBreakpoint } from "../../Utilities";
import { Dropzone } from "../../components/Dropzone";
import { Course, Courses, parseCourse } from "../../logic/icsGen";
import { initalCourses } from "../../logic/initialCourses";

import CoursePanel from "./CoursePanel";
import NavigationPanel from "./NavigationPanel";
import { transformTemplate, variants } from "./transitions";

// eslint-disable-next-line max-statements
const Review = () => {
  const [loading, setLoading] = useState<string[]>([]);
  const breakpoint = useBreakpoint();
  const navigate = useNavigate();

  const [
    courses,
    { set: setCourses, upsert: upsertCourse, removeAt: removeAtCourse },
  ] = useList<Course>(initalCourses);
  const { courseKey: courseKeyURLParam } = useParams<{
    courseKey: string | undefined;
  }>();

  const currentCourse =
    courses.find((course) => course.key === courseKeyURLParam) || null;

  const onCourseUpdate = (course: Course) => {
    upsertCourse((c) => c.key === course.key, course);
  };

  const onCourseDelete = (course: Course) => {
    removeAtCourse(courses.findIndex((c) => c.key === course.key));
    navigate("/app");
  };

  const base64encode = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result?.toString();
        if (base64String) {
          resolve(base64String);
        } else {
          reject("Error converting file to base64");
        }
      };
      reader.onerror = () => {
        reject("Error reading file");
      };

      reader.readAsDataURL(file);
    });
  };

  const onOutlineUpload = async (files: File[]) => {
    setLoading(files.map((f: File) => f.name));

    while (files.length > 0) {
      const file = files.pop();
      if (!file) continue;

      const fileString = await base64encode(file as File);
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
          course.file = fileString;

          onCourseUpdate(course);
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

  useEffectOnce(() => {
    // Load courses from local storage
    const foundCourses = localStorage.getItem("courses");
    if (!foundCourses) return;

    const parsedCourses: Courses = JSON.parse(foundCourses).map(parseCourse);
    setCourses(parsedCourses);
  });

  useUpdateEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  // Callback for select course in navigation drawer
  const onCourseClick = (course: Course) => {
    navigate(`/app/${course.key}`);
  };

  const isMobile = () => ["xs", "sm"].includes(breakpoint);

  // SPA stylings
  useEffectOnce(() => {
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");
  });

  return (
    <div className="overflow-hidden">
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
              className="fixed top-0 left-0 w-full md:w-20 xl:w-64 h-full bg-surface z-20"
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
              <div style={{ marginLeft: mainMarginLeft }}>
                <CoursePanel
                  course={currentCourse}
                  onBack={() => navigate("/app")}
                  onCourseUpdate={onCourseUpdate}
                  onCourseDelete={onCourseDelete}
                />
              </div>
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
