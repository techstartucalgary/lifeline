import { useNavigate } from "react-router-dom";

import LogoBar from "../components/LogoBar";
import React, { useState } from "react"

export default function Upload() {
  const [open, setOpen] = useState(false)
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `review`;; 
    navigate(path);
  }
 
  return (
    <div>
      <LogoBar/>
      <div
        className="h-auto md:h-screen pb-56 md:pb-0 font-display text-left overflow-x-hidden pt-36"
        style={{ backgroundColor: "#fffff", minWidth: 320 }}>
          <div className="px-3 md:px-9">
            <h1
              className="text-black text-xl md:text-xl font-bold landing-title mb-0 fade-in-top"
            >
              Upload and view your course outlines here
            </h1>
          </div>
          <hr className="my-0 mx-10 w-96 h-1 bg-gray-100 rounded border-0 md:my-10 dark:bg-gray-200"/>
          <div className="px-3 md:px-9">
            <h1
              className="text-secondary-30 text-lg md:text-lg font-bold landing-title mb-14 fade-in-top"
            >
              My course outlines
            </h1>
          </div>
          <div className="px-3 md:px-9">
            <h1
              className="text-secondary-30 text-lg md:text-lg font-bold landing-title mb-14 fade-in-top"
            >
              Upload a new file
            </h1>
          </div>
			</div>
    </div>
  );
}
