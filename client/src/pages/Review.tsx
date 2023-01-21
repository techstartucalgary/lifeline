// Route: /review

import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button/Button";
import axios from "axios";
import jsonToICS, { Course } from "../logic/icsGen";

export default function Review() {
  const [json, setJson] = useState<Course[]>([]);

  const handleFetchClick = () => {
    axios.get("/test-calendar-json")
      .then((res) => {
        setJson(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <main>
        <h2>Review/Edit page</h2>
      </main>
      <nav>
        <Link to="/upload">Add more files</Link>
      </nav>
      <div>
        <Button
          variant="filled"
          onClick={handleFetchClick}
        >
          Get JSON
        </Button>
      </div>
      <div>
        <p>{JSON.stringify(json)}</p>
      </div>
      <a id="ics-download"
        href={`data:text/plain;charset=utf-8, ${encodeURIComponent(jsonToICS(json))}`}
        download="deadlines.ics"
      >
        <Button
          variant="filled"
          id="download"
          disabled={!json.length}
        >
          Download
        </Button>
      </a>
    </>
  );
}
