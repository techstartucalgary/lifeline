import axios from "axios";
import { classnames } from "../../Utilities";
import jsonToICS, { Course, Courses } from "../../logic/icsGen";
import { useState, useRef } from "react";
import ProgressIndicator from "../ProgressIndicator/ProgressIndicator";
import NavItem from "./NavItem";

interface NavigationDrawerProps {
  courses: Courses;
  currentCourse: Course | null;
  onCoursesChanged: (courses: Courses) => void;
  onCourseClick: (course: Course) => void;
}


const calculateIcon = (course_key: string) => ["circle", "square", "pentagon"][
  Math.abs(
    course_key
      .split("")
      .reduce((a, b) => a + b.charCodeAt(0), 0)
  ) % 3
];

const NavigationDrawer = ({
  courses,
  currentCourse,
  onCoursesChanged,
  onCourseClick,
}: NavigationDrawerProps) => {
  const [loading, setLoading] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOutlineUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setLoading(Array.from(files).map((f: File) => f.name));

    const formData = new FormData();
    for (let i = 0; i < files.length; i++)
      formData.append("outline_files", files[i]);

    axios
      .post("/files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        onCoursesChanged(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading([]);
      });
  };

  const handleExport = () => {
    const a = document.createElement("a");
    a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(
      jsonToICS(courses)
    )}`;
    a.download = "deadlines.ics";
    a.click();
  };

  return (
    <div className="flex flex-col w-full bg-surface space-y-0.5">
      <p className="m-5 ml-5.5 font-bold">Courses</p>
      {courses && courses.map((course, t) => (
        <NavItem
          key={t}
          title={`${course.code} ${course.number}`}
          metadata={course.assessments.length}
          onClick={() => onCourseClick(course)}
          className={classnames(currentCourse === course && "bg-primary-container")}
          ripple={currentCourse !== course}
          icon={calculateIcon(course.key)}
        />
      ))}
      
      {loading.length > 0 && (
        <div className="flex flex-col w-full">
          {
            loading.map((file, t) => (
              <NavItem
                key={t}
                title={file}
                variant="text"
                disabled={true}
                icon={
                  <div className="h-5 w-5 overflow-hidden flex justify-center items-center">
                    <ProgressIndicator determinate={false} className="h-5 w-5" />
                  </div>
                }
              />
            ))
          }
        </div>
      )}

      <NavItem
        variant="text"
        onClick={() => {
          inputRef.current?.click();
        }}
        icon="add"
        title="Add course"
        className="text-outline"
        metadata={
          <input ref={inputRef}
            type="file"
            accept=".pdf"
            multiple
            onChange={handleOutlineUpload}
            className="hidden" 
            aria-hidden
          />
        }
      />

      <hr className="border-gray-300 p-2 mx-6 hidden md:block" />

      <NavItem
        variant="filled"
        className="rounded-[20px]"
        onClick={handleExport}
        icon="save_alt"
        title="Export"
      />
    </div>
  );
};

export default NavigationDrawer;
export type { NavigationDrawerProps };
