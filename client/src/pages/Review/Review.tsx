// Route: /review

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import jsonToICS, { Course } from "../../logic/icsGen";

import "./Review.module.css";

export default function Review() {
  const location = useLocation();
  const [course, setCourse] = useState<Course>(
    JSON.parse(decodeURIComponent(location.search.split("=")[1]))[0]
  );
  // sort the assessments by date
  const sortbyDate = () =>
    course.assessments.sort((a, b) =>
      a.date >= b.date ? 1 : -1
    );
  sortbyDate();

  return (
    <>
      <main>
        <h2>Review/Edit page</h2>
      </main>
      <nav>
        <Link to="/upload">Add more files</Link>
      </nav>

      <div>
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Assessment</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {course.assessments.map((assessment, index) => (
              <tr key={index}>
                <td>{course.name}</td>
                <td>
                  <input
                    type="text"
                    style={{
                      textAlign: "center",
                      width: "100%",
                      border: "none",
                      background: "transparent",
                    }}
                    value={assessment.name}
                    onChange={(e) => {
                      setCourse({
                        ...course,
                        assessments: course.assessments.map((a, i) => {
                          if (i === index) {
                            return {
                              ...a,
                              name: e.target.value,
                            };
                          }
                          return a;
                        }),
                      });
                    }}
                  />
                </td>
                <td>
                  <input type="datetime-local"
                    style={{
                      textAlign: "center",
                      width: "100%",
                      border: "none",
                      background: "transparent"
                    }}
                    value={assessment.date}
                    onChange={(e) => {
                      setCourse({
                        ...course,
                        assessments: course.assessments.map((a, i) => {
                          if (i === index) {
                            return {
                              ...a,
                              date: e.target.value,
                            };
                          }
                          return a;
                        }),
                      });
                      sortbyDate();
                    }}
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      setCourse({
                        ...course,
                        assessments: course.assessments.filter((_, i) => i !== index),
                      });
                    }}>
                    <span className="material-icons">delete</span>
                  </button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
      <a id="ics-download"
        href={`data:text/plain;charset=utf-8, ${encodeURIComponent(jsonToICS([course]))}`}
        download="deadlines.ics"
      >
        <Button
          variant="filled"
          id="download"
        >
          Download
        </Button>
      </a>
    </>
  );
}
