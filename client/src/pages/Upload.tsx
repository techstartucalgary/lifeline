import LogoBar from "../components/LogoBar";
import React, { useEffect, useState } from "react"
import Button from "../components/Button";
import axios from "axios";
import clsx from "clsx"

export default function Upload() {
  const [outlineUploadLoading, setOutlineUploadLoading] = useState(false)
  const supportedFileTypes = [
    "application/pdf",
  ]

  const handleOutlineUpload = (event?: React.ChangeEvent<HTMLInputElement>) => {
    if (event!.target.files!.length > 1) {
      console.log("fileInput", "Please upload a single file")
      return
    }

    let file = event!.target.files![0]

    if (file.size > 3000000) {
      console.log("fileInput", "The maximum file size is 3MB")
      return
    }

    if (!supportedFileTypes.includes(file.type)) {
      console.log("fileInput", "This file type is not supported yet")
      return
    }

    setOutlineUploadLoading(true);

    const uploadFiletype =
      file.type === supportedFileTypes[0]
        ? ".pdf"
        : supportedFileTypes[1]
        ? ".doc"
        : ".docx"
    const uploadFilename = file.name + uploadFiletype
    console.log(uploadFilename + "was uploaded");

    const formData = new FormData();
    formData.append(
      "file",
      file,
    )
    axios.post("/files", formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally (() => {
      setOutlineUploadLoading(false);
    })
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
          <hr className="my-0 md:my-5 mx-10 w-4/12 h-0.5 bg-black-10 rounded border-0 dark:bg-gray-200"/>
          
          <div className="flex flex-row border border-red-100 mx-9 h-2/3">
            <div className="basis-1/2 border border-blue-100">
              <h1 className="text-secondary-30 text-lg md:text-lg font-bold landing-title mb-14 fade-in-top">
                My course outlines
              </h1>
              
			  <div>

			  </div>
            </div>
            <div className="basis-1/2">
              <h1 className="text-secondary-30 text-lg md:text-lg font-bold landing-title mb-14 fade-in-top">
                Upload a new file
              </h1>
         
              <div className="is-flex is-align-items-center is-justify-content-center is-flex-direction-column">
                <input
                  name="fileInput"
                  type="file"
                  aria-label="Upload Course Outline"
                  id="upload-outline"
                  onChange={handleOutlineUpload}
                  accept={supportedFileTypes.join(",")}
                />
                <label
                  htmlFor="upload-outline"
                  className={clsx(
                    "is-clickable mr-2 button has-text-weight-medium is-small has-text-grey-dark",
                    {
                      "is-loading": outlineUploadLoading
                    }
                  )}
                >
                  Upload
                </label>
              </div>

            </div>
          </div>

          <Button variant="default" size="lg">Next</Button>
			</div>
      
    </div>
  );
}