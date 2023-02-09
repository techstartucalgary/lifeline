import axios from "axios";
import { classnames } from "../../Utilities";
import Button from "../Button";
import jsonToICS, { Courses } from "../../logic/icsGen";
import { useState, useRef } from "react";

interface NavigationDrawerProps {
  courses: Courses;
  currentCourseKeyString: string | undefined;
  onCoursesChanged: (courses: Courses) => void;
}

const NavigationDrawer = ({ courses, currentCourseKeyString, onCoursesChanged }: NavigationDrawerProps) => {
  const [loading, setLoading] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const urlFormat = (course: string) => (course.replace(/ /g, "-").toLowerCase());

  const handleOutlineUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files)
      return;
    setLoading(Array.from(files).map((f: File) => f.name));

    const formData = new FormData();
    for (let i = 0; i < files.length; i++)
      formData.append("outline_files", files[i]);

    axios.post("/files", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(res => {
        // if they share a key, rename the new one
        for (const key in res.data) {
          if (key in courses) {
            let i = 1;
            while (`${key} (${i})` in courses)
              i++;
            res.data[`${key} (${i})`] = res.data[key];
            delete res.data[key];
          }
        }

        onCoursesChanged(res.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setLoading([]);
      });
  };

  const handleExport = () => {
    const a = document.createElement("a");
    a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(jsonToICS(courses))}`;
    a.download = "deadlines.ics";
    a.click();
  };

  return (
    <div className="flex flex-col w-full md:p-4 p-0 bg-surface">
      <p className="m-5 ml-2 font-bold">Courses</p>

      {courses && Object.entries(courses).map(([course, courseData]) => (
        <Button
          variant="text"
          to={`/review/${urlFormat(course)}`}
          key={course}
          className={classnames(
            "text-gray-900",
            "mt-2",
            "flex",
            "flex-row",
            "p-4",
            currentCourseKeyString === course && "bg-primary-90",
          )}
        >
          <span className="material-icons text-gray-600 text-base flex items-center justify-center">
            {["circle", "square", "pentagon"][Math.abs(course.split("").reduce((a, b) => a + b.charCodeAt(0), 0)) % 3]}
          </span>
          <div className="flex flex-col ml-2 min-w-0">
            <p className="flex items-center font-bold">
              {course}
            </p>
            <p className={classnames("truncate", "md:hidden")}>
              {courseData.topic} - The course.course descriptions can be quite long, so we truncate them to save space.
            </p>
          </div>
          <p className="ml-auto flex items-center justify-center">
            {courseData.assessments.length}
          </p>
          <span className="material-icons text-gray-600 flex items-center justify-center block md:hidden">
            arrow_right
          </span>
        </Button>
      ))}
      {loading.length > 0 && (
        <div className="flex flex-col w-full">
          {loading.map((file) => (
            <Button
              variant="text"
              key={file}
              disabled
              className={classnames("mt-2", "flex-row", "p-4",)}
            >
              <span className="material-icons text-gray-600 text-base flex items-center justify-center animate-spin">
                autorenew
              </span>
              <div className="flex flex-col ml-2 min-w-0">
                <p className={classnames("truncate")}>
                  {file}
                </p>
              </div>
            </Button>
          ))}
        </div>
      )}
      <Button
        variant="text"
        onClick={() => {
          inputRef.current?.click();
        }}
        className="text-gray-900 mt-2 p-4"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          multiple
          onChange={handleOutlineUpload}
          className="hidden"
        />
        <span
          className="material-icons text-gray-600 flex items-center justify-center"
          style={{ marginLeft: "-0.4rem" }}
        >
          add
        </span>
        <p className="flex items-center ml-2"
          style={{ transform: "translateX(-0.4rem)", }}>
          Add course
        </p>
      </Button>
      <hr className="border-gray-300 p-2 hidden md:block" />
      <Button variant="filled"
        // on mobile it sits in the absolute bottom right and is only as wide as the text. Has a shadow on mobile
        className={classnames("fixed", "bottom-0", "right-0", "md:relative", "p-4", "m-5", "mb-10", "md:m-0", "shadow-lg", "md:shadow-none", "rounded-2xl", "md:rounded-3xl")}
        onClick={handleExport}
      >
        <span className="material-icons flex items-center justify-center"
          style={{ marginLeft: "-0.4rem" }}
        >
          save_alt
        </span>
        <p className="flex items-center ml-2">
          Export
        </p>
      </Button>
    </div >
  );
};

export default NavigationDrawer;
export type { NavigationDrawerProps };