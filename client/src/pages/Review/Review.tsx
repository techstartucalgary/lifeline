import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavigationDrawer from "../../components/NavigationDrawer";
import AssessmentCard from "../../components/AssessmentCard";
import { classnames } from "../../Utilities";
import { Courses } from "../../logic/icsGen";
import styles from "./Review.module.css";

const testState: Courses = {
  "psyc-203": {
    code: "PYSC",
    number: "203",
    title: "Psychology",
    key: "psyc-203",
    topic: "Psychology of Everyday Life",
    assessments: [
      {
        name: "Identity Assignment",
        date: "2021-10-21T18:00:00.000",
        weight: "6%",
      },
      {
        name: "Coping Profile Assignment",
        date: "2021-10-29T18:00:00.000",
        weight: "2%",
      },
      {
        name: "Self-Reflection/Goal Setting Assignment",
        date: "2021-12-07T18:00:00.000",
        weight: "7%",
      },
      {
        name: "Experiential-Learning/Article-Evaluation Course Component",
        date: "2021-12-08T23:59:59.999",
        weight: "4%",
      },
      {
        name: "Exam 1",
        date: "2021-10-14T00:00:00.000",
        weight: "25%",
      },
      {
        name: "Exam 2",
        date: "2021-11-18T00:00:00.000",
        weight: "25%",
      },
      {
        name: "Exam 3/Final Exam",
        date: "",
        weight: "31%",
      },
    ],
  },
};

const Review = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [courses, setCourses] = useState<Courses>(testState);

  const { courseKey } = useParams();
  const navigate = useNavigate();

  const onCoursesChanged = (newCourses: Courses) => {
    setCourses({ ...courses, ...newCourses });
  };

  useEffect(() => {
    if (!courseKey || courses[courseKey] === undefined) {
      navigate("/app");
    }
  }, [courseKey]);

  return (
    <div className="flex flex-row justify-between">
      <nav
        className={classnames(
          "md:w-64",
          "w-full",
          "flex-shrink-0",
          courseKey && "hidden",
          "md:block",
          "bg-gray-100"
        )}
      >
        <NavigationDrawer
          courses={courses}
          currentCourseKeyString={courseKey}
          onCoursesChanged={onCoursesChanged}
        />
      </nav>
      {courseKey && courses[courseKey] && (
        <main
          className={classnames(
            "flex-shrink-0 text-center w-full",
            styles.main
          )}
        >
          <header className="bg-gray-300 w-full p-4 text-xl">
            <Link to="/app">
              <span
                className={classnames("material-icons", "md:hidden", "inline")}
                style={{ fontSize: "1.5rem", verticalAlign: "middle" }}
              >
                arrow_back
              </span>
            </Link>
            <h1 className="text-4xl">
              {courses[courseKey].title} {courses[courseKey].number}
            </h1>
            <h2 className="text-2xl">{courses[courseKey].topic}</h2>
          </header>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:hidden flex flex-row">
              <button
                className={classnames(
                  "w-full bg-gray-300 p-2",
                  selectedTab === 0 && "bg-red-500"
                )}
                onClick={() => setSelectedTab(0)}
              >
                Assessments
              </button>
              <button
                className={classnames(
                  "w-full bg-gray-300 p-2",
                  selectedTab === 1 && "bg-red-500"
                )}
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
                "p-4",
                "h-screen",
                selectedTab === 1 && "hidden md:block"
              )}
            >
              <ul className="flex flex-col">
                {courses[courseKey].assessments.map((assessment) => (
                  <AssessmentCard
                    key={assessment.name + assessment.date + assessment.weight} // should be assessment.source eventually
                    assessment={assessment}
                    onAssessmentClick={() => {
                      console.log("clicked");
                    }}
                  />
                ))}
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
      )}
      <div className="w-64"></div>
    </div>
  );
};

export default Review;
