import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavigationDrawer from "../../components/NavigationDrawer";
import { classnames } from "../../Utilities";
import { Courses } from "../../logic/icsGen";


const Review = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [courses, setCourses] = useState<Courses>({});
  const displayFormat = (course: string) => (course.replace(/-/g, " ").toUpperCase());

  let { courseId } = useParams();
  courseId = courseId ? displayFormat(courseId) : undefined;

  const onCoursesChanged = (newCourses: Courses) => {
    setCourses({ ...courses, ...newCourses });
  };


  return (
    <div className="flex flex-row h-screen">
      <nav
        className={classnames(
          "w-full", "md:w-64", "h-full", "absolute", "flex", "flex-col", "items-center", "z-0", !courseId && "z-20"
        )}>
        <NavigationDrawer currentCourseKeyString={courseId} courses={courses} onCoursesChanged={onCoursesChanged} />
      </nav>
      <main className="flex flex-col w-full ml-0 md:ml-64 z-10">
        {courseId ? (
          <>
            <header className="bg-gray-300 w-full p-4 text-xl">
              <Link to="/review">
                <span
                  className={classnames("material-icons", "md:hidden", "inline")}
                  style={{ fontSize: "1.5rem", verticalAlign: "middle" }}
                >
                  arrow_back
                </span>

              </Link>
              <h1 className="text-4xl">
                {courseId}
              </h1>
              <h2 className="text-2xl">
                {courses[courseId]?.topic}
              </h2>
            </header>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:hidden flex flex-row">
                <button
                  className={`w-full bg-gray-300 p-2 ${selectedTab === 0 && "bg-red-500"}`}
                  onClick={() => setSelectedTab(0)}
                >
                  Assessments
                </button>
                <button
                  className={`w-full bg-gray-300 p-2 ${selectedTab === 1 && "bg-red-500"}`}
                  onClick={() => setSelectedTab(1)}
                >
                  Document
                </button>
              </div>
              <section className={classnames(
                "w-full", "md:w-1/2", "border", "border-gray-300", "bg-gray-200", "p-4", "h-screen", selectedTab === 0 ? "" : "hidden md:block"
              )}>
                <ul>
                  {courses[courseId]?.assessments.map((assessment, index) => (
                    <li key={index}>
                      <h3 className="text-2xl">{assessment.name}</h3>
                    </li>
                  ))}
                </ul>
              </section>
              <section
                className={classnames(
                  "w-full", "md:w-1/2", "border", "border-gray-300", "bg-gray-600", "p-4", "h-screen", selectedTab === 1 ? "" : "hidden md:block"
                )}>
                <img src="../pdf.png" alt="the pdf viewer" />
              </section>
            </div>
          </>
        ) : (
          <p className={classnames(
            "hidden", "md:block", "bg-gray-300", "w-full", "p-4", "text-xl"
          )}
          >Upload</p>
        )}
      </main>
    </div >
  );
};

export default Review;
