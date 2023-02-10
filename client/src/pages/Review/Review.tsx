import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavigationDrawer from "../../components/NavigationDrawer";
import { classnames } from "../../Utilities";
import { Courses } from "../../logic/icsGen";
import styles from "./Review.module.css";


const Review = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [courses, setCourses] = useState<Courses>({});
  const displayFormat = (course: string) =>
    course.replace(/-/g, " ").toUpperCase();

  let { courseId } = useParams();
  courseId = courseId ? displayFormat(courseId) : undefined;

  const onCoursesChanged = (newCourses: Courses) => {
    setCourses({ ...courses, ...newCourses });
  };

  return (
    <div className="flex flex-row justify-between">
      <nav
        className={classnames(
          "md:w-64",
          "w-full",
          "flex-shrink-0",
          courseId && "hidden",
          "md:block",
          "bg-gray-100"
        )}
      >
        <NavigationDrawer
          courses={courses}
          currentCourseKeyString={courseId}
          onCoursesChanged={onCoursesChanged}
        />
      </nav>
      <main
        className={classnames(
          "bg-gray-300 flex-shrink-0 text-center w-full",
          styles.main
        )}
      >
        <header className="bg-gray-300 w-full p-4 text-xl">
          <Link to="/review">
            <span
              className={classnames("material-icons", "md:hidden", "inline")}
              style={{ fontSize: "1.5rem", verticalAlign: "middle" }}
            >
              arrow_back
            </span>
          </Link>
          <h1 className="text-4xl">{courseId && displayFormat(courseId)}</h1>
          <h2 className="text-2xl">
            Explorations in Information Security and Privacy
          </h2>
        </header>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:hidden flex flex-row">
            <button
              className={`w-full bg-gray-300 p-2 ${
                selectedTab === 0 && "bg-red-500"
              }`}
              onClick={() => setSelectedTab(0)}
            >
              Assessments
            </button>
            <button
              className={`w-full bg-gray-300 p-2 ${
                selectedTab === 1 && "bg-red-500"
              }`}
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
              "border-gray-300",
              "bg-gray-200",
              "p-4",
              "h-screen",
              selectedTab === 1 && "hidden md:block"
            )}
          >
            <ul>
              <li>Assessment 1</li>
              <li>Assessment 2</li>
              <li>Assessment 3</li>
              <li>Assessment 4</li>
              <li>Assessment 5</li>
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
              selectedTab === 0 && "hidden md:block"
            )}
          >
            <img src="../pdf.png" alt="the pdf viewer" />
          </section>
        </div>
      </main>
      <div className="w-64"></div>
    </div>
  );
};

export default Review;
