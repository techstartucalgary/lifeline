import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { useBeforeUnload, useParams } from "react-router-dom";

import { classnames } from "../../Utilities";
import { Assessment, Course, Courses, parseCourse } from "../../logic/icsGen";

import { IconButton } from "../../components/Button";
import AppTopBar, {
  LeadingNavigation,
  TrailingIcon,
  Title,
  Subtitle,
} from "../../components/AppTopBar";
import CoursePanel from "./CoursePanel";
import NavigationPanel from "./NavigationPanel";
import { Dropzone } from "../../components/Dropzone";

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

  return (
    <>
      <nav
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
      </nav>
      {currentCourse ? (
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
      ) : (
        <>
          <div
            className={classnames(
              "mx-auto relative h-screen",
              mainMarginLeft < 0 && "hidden"
            )}
            ref={mainRef}
            style={{ paddingLeft: mainMarginLeft }}
          >
            <Dropzone onDrop={(files) => console.log(files)} />
          </div>
        </>
      )}
    </>
  );
};

export default Review;
