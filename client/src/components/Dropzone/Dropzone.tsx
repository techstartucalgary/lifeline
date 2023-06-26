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
          <div className="text-center">
            {isDragActive ? (
              <p>Drop the file(s) here...</p>
            ) : (
              <div>
                To get started, drag and drop your course outlines here or click
                &quot;Add course&quot;
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dropzone;
