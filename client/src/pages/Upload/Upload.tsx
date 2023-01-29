import NavigationBar from "../../components/NavigationBar/NavigationBar";
import React, { useState } from "react";
import Button from "../../components/Button";
import axios from "axios";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

export default function Upload() {
  const navigate = useNavigate();
  const [outlineUploadLoading, setOutlineUploadLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const supportedFileTypes = [
    "application/pdf",
  ];

  const handleOutlineUpload = () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }
    if (file.size > 3000000) {
      alert("The maximum file size is 3MB");
      return;
    }
    if (!supportedFileTypes.includes(file.type)) {
      alert("This file type is not supported yet");
      return;
    }

    setOutlineUploadLoading(true);
    const formData = new FormData();
    formData.append(
      "outline_file",
      file,
    );
    axios.post("/files", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(res => {
      // navigate to the review page with the res encoded in the url
      navigate(`/review?data=${encodeURIComponent(JSON.stringify(res.data))}`);
    }).catch((error) => {
      alert(`An error occurred while uploading the file: ${error}`);
    }).finally(() => {
      setOutlineUploadLoading(false);
    });
  };

  return (
    outlineUploadLoading ? <Loading /> :
      <div>
        <NavigationBar />

        <div
          className="h-auto md:h-screen md:pb-0  font-display text-left overflow-x-hidden pt-22 md:pt-20 border border-green-200"
          style={{ backgroundColor: "#fffff", minWidth: 320 }}>
          <div className="px-3 md:px-9">
            <h1
              className="text-black text-xl md:text-xl font-bold landing-title mb-0 fade-in-top"
            >
              Upload and view your course outlines here
            </h1>
          </div>
          <hr className="my-0 md:my-5 mx-10 w-4/12 h-0.5 bg-black-10 rounded border-0 dark:bg-gray-200" />

          <div className="flex flex-row mx-9 h-2/3">
            <div className="basis-1/2 border border-red-100 ">
              <h1 className="text-secondary-30 text-lg md:text-lg font-bold landing-title mb-14 fade-in-top">
                My course outlines
              </h1>


            </div>
            <div className="basis-1/2 ">
              <h1 className="text-secondary-30 text-lg md:text-lg font-bold landing-title mb-14 fade-in-top">
                Upload a new file
              </h1>

              <div className="is-flex is-align-items-center is-justify-content-center is-flex-direction-column">
                <input
                  name="fileInput"
                  type="file"
                  aria-label="Upload Course Outline"
                  id="upload-outline"
                  className="width=0 height=0 opacity=0 overflow=hidden position=absolute z-index=-1 pointer-events=none border border-red-100"
                  onChange={(e) => { setFile(e.target.files?.item(0) ?? null); }}
                  accept={supportedFileTypes.join(",")}
                />
                <label
                  htmlFor="upload-outline"
                  className={clsx(
                    "width=0 height=0 opacity=0 overflow=hidden position=absolute z-index=-1 pointer-events=none",
                    {
                      "is-loading": outlineUploadLoading
                    }
                  )}
                >
                </label>
              </div>

            </div>
          </div>

          <Button
            onClick={handleOutlineUpload}
            variant="filled"
            className="text-xl absolute bottom-38 right-24"
            disabled={file === null}
          >Next
          </Button>
          <Button
            onClick={() => navigate("/review")}
            variant="filled"
            className="text-xl absolute bottom-38 right-50"
          >Review</Button>
        </div>
      </div>
  );
}