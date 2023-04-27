import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { classnames } from "../../Utilities";

interface DropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  isLoading: boolean;
}

const Dropzone = ({ onDrop, isLoading }: DropzoneProps) => {
  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: {
      "application/pdf": [".pdf"],
    },
    noClick: true,
  });

  return (
    <div
      {...getRootProps()}
      className={classnames(
        "h-full",
        "flex flex-col justify-center items-center",
        isDragActive && "bg-gray-200"
      )}
    >
      <input {...getInputProps()} />
      {!isLoading && (
        <>
          <span className="material-symbols-outlined text-5xl">add</span>
          <p className="text-center">
            {isDragActive ? (
              <p>Drop the file(s) here...</p>
            ) : (
              <p>
                To get started, drag and drop your course outlines here or click
                &quot;Add course&quot;
                <br />
                If you just want to try the app, you can use these sample
                outlines: <br />
                <ul className="list-disc list-inside text-left">
                  <li>
                    <a
                      className="text-blue-600 underline"
                      href="https://github.com/techstartucalgary/lifeline/raw/main/server/test-data/ARHI201/ARHI201.pdf"
                    >
                      Introduction to Art History 1
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blue-600 underline"
                      href="https://github.com/techstartucalgary/lifeline/raw/main/server/test-data/CPSC331/CPSC331.pdf"
                    >
                      Data Structures, Algorithms, and Their Analysis
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blue-600 underline"
                      href="https://github.com/techstartucalgary/lifeline/raw/main/server/test-data/CPSC457/CPSC457.pdf"
                    >
                      Principles of Operating Systems
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blue-600 underline"
                      href="https://github.com/techstartucalgary/lifeline/raw/main/server/test-data/INTE505.02/INTE505.02.pdf"
                    >
                      Science Internship Fall Work Term Placement
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-blue-600 underline"
                      href="https://github.com/techstartucalgary/lifeline/raw/main/server/test-data/PSYC203/PSYC203.pdf"
                    >
                      Psychology of Everyday Life
                    </a>
                  </li>
                </ul>
              </p>
            )}
          </p>
        </>
      )}
    </div>
  );
};

export default Dropzone;
