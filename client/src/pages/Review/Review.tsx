import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "../../components/Button";
import { classnames } from "../../Utilities";

const courses = ["cpsc-413", "seng-513", "cpsc-481", "cpsc-449", "cpsc-457"];

const Review = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { courseId } = useParams();
  const format = (courseId: string | undefined) => courseId?.replace("-", " ").toUpperCase();

  return (
    <div className="flex h-screen">
      <nav
        className={classnames(
          "w-full", "sm:w-64", "bg-gray-600", "h-full", "fixed", "left-0", "top-0", "flex", "flex-col", "p-4", "items-center", "z-0", !courseId && "z-20"
        )}
      >
        <div className="flex flex-col h-full">
          {courses.map((course) => (
            <Link to={`/review/${course}`} key={course}>
              <Button variant={
                courseId === course ? "filled" : "tonal"
              } onClick={() => { console.log(course); }
              }>{format(course)}</Button>
            </Link>
          ))}
        </div>
      </nav>
      <div className="flex flex-col w-full ml-0 sm:ml-64 z-10">
        {courseId ? (
          <>
            <header className="bg-gray-300 w-full p-4 text-xl">
              <Link to="/review">
                <span
                  className={classnames("material-icons", "sm:hidden", "inline")}
                  style={{ fontSize: "1.5rem", verticalAlign: "middle" }}
                >
                  arrow_back
                </span>

              </Link>
              COURSE NAME: {format(courseId)}
            </header>
            <div className="flex flex-col sm:flex-row">
              <div className="w-full sm:hidden flex flex-row">
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
              <div
                className={`w-full sm:w-1/2 border border-gray-300 bg-gray-200 p-4 h-screen ${selectedTab === 0 ? "" : "hidden sm:block"}`}
              >
                <ul>
                  <li>Assessment 1</li>
                  <li>Assessment 2</li>
                  <li>Assessment 3</li>
                  <li>Assessment 4</li>
                  <li>Assessment 5</li>
                </ul>
              </div>
              <div
                className={`w-full sm:w-1/2 border border-gray-300 bg-gray-600 p-4 h-screen ${selectedTab === 1 ? "" : "hidden sm:block"}`}
              >
                <img src="../pdf.png" alt="the pdf viewer" />
              </div>

            </div>
          </>
        ) : (
          <p>upload</p>
        )}
      </div>
    </div >
  );
};

export default Review;
