// Route: /review

import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import generate, { Course } from "../logic/icsGen2";

export default function Review() {
  const [text, setText] = useState<string>("");
  const [json, setJson] = useState<Course[]>([]);

  const handleDownloadClick = () => {
    const ics: string = generate(json);
    console.log(ics);

    const link = document.getElementById("ics-download");

    if (link === null) {
      console.log("link is null");
      return;
    }
    link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(ics));
    link.setAttribute("download", "calendar.ics");
    link.click();

    // // Create a Blob containing the text in the text box
    // const textBlob = new Blob([text], { type: "text/plain" });

    // // Create a link element and trigger a click event to start the download
    // const link = document.createElement("a");
    // link.href = URL.createObjectURL(textBlob);
    // link.download = "words.txt";
    // link.click();
  };

  const handleFetchClick = () => {
    // send a get request to /test-calendar-json
    axios.get("/test-calendar-json")
      .then((res) => {
        // set the text box to the response data
        setText(JSON.stringify(res.data));
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
        <button
          onClick={handleFetchClick}
        >Get JSON</button>
      </div>


      <div>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <br />
        <button onClick={handleDownloadClick}>Download</button>
      </div>
      <a id="ics-download">Download ics</a>

    </>
  );
}
