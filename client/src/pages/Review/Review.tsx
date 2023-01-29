// Route: /review

import { Link, useLocation } from "react-router-dom";
import Button from "../../components/Button";
import jsonToICS, { Course } from "../../logic/icsGen";

export default function Review() {
  const location = useLocation();
  const data: Course[] = JSON.parse(decodeURIComponent(location.search.split("=")[1]));

  return (
    <>
      <main>
        <h2>Review/Edit page</h2>
      </main>
      <nav>
        <Link to="/upload">Add more files</Link>
      </nav>

      <div>
        {/* some quick inline styling */}
        <table
          style={{
            border: "1px solid black",
            borderCollapse: "collapse",
            width: "100%",
          }
          }
        >
          <thead style={
            {
              border: "1px solid black",
              borderCollapse: "collapse",
            }
          }>
            <tr>
              <th>Course</th>
              <th>Assessment</th>
              <th>Date</th>
            </tr>
          </thead>
          {/* Inline styling for column separating lines */}
          <tbody          >
            {data[0].assessments.map(assessment => (
              // eslint-disable-next-line react/jsx-key
              <tr>
                <td>{data[0].course}</td>
                <td>{assessment.name}</td>
                {/* Print as month name day, year */}
                <td>{new Date(assessment.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a id="ics-download"
        href={`data:text/plain;charset=utf-8, ${encodeURIComponent(jsonToICS(data))}`}
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
