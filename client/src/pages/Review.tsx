// Route: /review

import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import jsonToICS, { Course } from "../logic/icsGen";

export default function Review() {
  const [json, setJson] = useState<Course[]>([]);

  const handleCompileClick = () => {
    const ics: string = jsonToICS(json);
    console.log(ics);
    const link = document.getElementById("ics-download");

    if (link === null) {
      console.log("link is null");
      return;
    }

    link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(ics));
    link.setAttribute("download", "deadlines.ics");
  };

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
        >Get JSON</Button>
      </div>

      <div>
        <p>{JSON.stringify(json)}</p>
        <Button variant="tonal" onClick={handleCompileClick}>Compile</Button>
      </div>
      <a id="ics-download" href="/">
        <Button variant="filled">Download</Button>
      </a>
    </>
  );
}
