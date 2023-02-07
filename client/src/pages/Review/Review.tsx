import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavigationDrawer from "../../components/NavigationDrawer";
import { classnames } from "../../Utilities";
import { Course } from "../../logic/icsGen";
import Button from "../../components/Button";
import { Response, Assessment } from "../../logic/icsGen";


const Review = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { courseId } = useParams();

  const [data, setData] = useState<Response>({});

  return (
    <div className="flex flex-row h-screen">
      <nav
        className={classnames(
          "w-full", "md:w-64", "h-full", "absolute", "flex", "flex-col", "items-center", "z-0", !courseId && "z-20"
        )}>
        <NavigationDrawer currentCourse={courseId} data={data} setData={setData} />
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
                {data[courseId]?.topic}
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
                  {data[courseId]?.assessments.map((assessment, index) => (
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


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LayoutNoHeader = () => (
  <div className="flex flex-row">
    <div className="flex flex-row justify-between bg-gray-300 w-1/2">
      <nav style={{ width: 260, minWidth: 260, backgroundColor: "red" }}>
      </nav>
      <section
        className={classnames(
          "bg-blue-300",
          "h-screen",
          "max-w-screen-sm",
          "overflow-x-scroll",
        )}>
        <h1 className={classnames("text-4xl")}
        >CPSC 413</h1>
        <h2 className={classnames("text-2xl")}>
          Explorations in Information Security and Privacy
        </h2>
        <p>
          Left section content! Left section content! Left section content! Left section content! Left section content! Left section content! Left section content! Left section content! Left section content! Left section content! Left section content! Left section content!
        </p>
      </section>
    </div>
    <div className="flex flex-row justify-between bg-gray-300 w-1/2">
      <section className="bg-red-200 h-screen max-w-screen-sm">
        <p>
          Right section content! Right section content! Right section content! Right section content! Right section content! Right section content! Right section content! Right section content! Right section content! Right section content! Right section content!
        </p>
      </section>
    </div>
  </div>
);