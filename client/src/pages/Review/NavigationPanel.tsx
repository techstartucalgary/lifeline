import { useRef, useState } from "react";
import List from "../../components/List";
import NavigationDrawer from "../../components/NavigationDrawer";
import jsonToICS, { Course, Courses } from "../../logic/icsGen";
import axios from "axios";
import { classnames } from "../../Utilities";
import ProgressIndicator from "../../components/ProgressIndicator";
import { Button, IconButton } from "../../components/Button";
import AppTopBar from "../../components/AppTopBar/AppTopBar";
import NavigationRail from "../../components/NavigationRail";


const generateIcon = (course_key: string) => ["circle", "square", "pentagon", "hexagon", "rectangle"][
  Math.abs(
    course_key
      .split("")
      .reduce((a, b) => a + b.charCodeAt(0), 0)
  ) % 3
];


interface NavigationPanelProps {
  courses: Courses;
  currentCourse: Course | null;
  onCourseClick(course: Course | null): void;
  onCoursesChanged(courses: Courses): void;
}

const NavigationPanel = ({ courses, currentCourse, onCourseClick, onCoursesChanged }: NavigationPanelProps) => {
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
    <>
      <div className="hidden md:hidden xl:block p-3">
        <input ref={inputRef}
          type="file"
          accept=".pdf"
          multiple
          onChange={handleOutlineUpload}
          className="hidden" 
          aria-hidden
        />

        <NavigationDrawer
          title="Courses"
        >
          {courses && courses.map((course, t) => (
            <NavigationDrawer.Item
              key={t}
              title={`${course.code} ${course.number}`}
              metadata={course.assessments.length}
              onClick={() => onCourseClick(course)}
              selected={course === currentCourse}
              ripple={currentCourse !== course}
              icon={generateIcon(course.code)}
            />
          ))}

          {loading.length > 0 && (
            <div className="flex flex-col w-full">
              {
                loading.map((file, t) => (
                  <NavigationDrawer.Item
                    key={t}
                    title={file}
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

          <Button
            variant="text"
            color="tertiary"
            className="rounded-[20px] py-4.5 px-5.5 text-secondary font-normal"
            onClick={() => {
              inputRef.current?.click();
            }}
            icon="add"
          >
            Add course
          </Button>

          <hr className="border-gray-300 p-2 mx-6 hidden md:block" />

          <Button
            variant="tonal"
            color="tertiary"
            className="rounded-[20px] py-5 px-5.5"
            onClick={handleExport}
            disabled={courses.length === 0 || loading.length > 0}
            icon="save_alt"
          >
            Export
          </Button>
        </NavigationDrawer>
      </div>
      <div className="hidden md:block xl:hidden">
        <NavigationRail>
          <IconButton
            icon="save_alt"
            variant="tonal"
            color="tertiary"
            className="rounded-2xl mx-2.5 px-4 mt-8 mb-6 text-center"
            iconClassName="text-on-surface text-3xl md:text-3xl"
            onClick={handleExport}
          />

          {courses && courses.map((course, t) => (
            <NavigationRail.Item
              key={t}
              title={`${course.code} ${course.number}`}
              onClick={() => onCourseClick(course)}
              icon={generateIcon(course.code)}
              selected={course === currentCourse}
            />
          ))}

          {loading.length > 0 && (
            <div className="flex flex-col w-full">
              {
                loading.map((file, t) => (
                  <NavigationRail.Item
                    key={t}
                    title={file}
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

          <IconButton
            onClick={() => {
              inputRef.current?.click();
            }}
            icon="add"
            variant="text"
            color="tertiary"
            className="rounded-2xl mx-2.5 px-4 py-1 text-center"
            iconClassName="text-on-tertiary-container text-3xl md:text-3xl"
          />
        </NavigationRail>
      </div>
      <div className="block md:hidden xl:hidden">
        <AppTopBar variant="medium">
          <AppTopBar.Title>
            Courses
          </AppTopBar.Title>
          <AppTopBar.TrailingIcon>
            <IconButton
              icon="add"
              className="text-on-surface px-1.5"
              onClick={() => {
                inputRef.current?.click();
              }}
            />
          </AppTopBar.TrailingIcon>
        </AppTopBar>
        <List>
          {courses && courses.map((course, t) => (
            <List.Item
              key={t}
              title={`${course.code} ${course.number}`}
              supportingText={course.topic}
              metadata={<p className="rounded-full bg-secondary-95 py-2 w-8">{ course.assessments.length }</p>}
              onClick={() => onCourseClick(course)}
              className={classnames(currentCourse === course && "bg-primary-container")}
              ripple={currentCourse !== course}
              leadingIcon={generateIcon(course.key)}
              trailingIcon="arrow_right"
            />
          ))}

          {loading.length > 0 && loading.map((file, t) => (
            <List.Item
              key={t}
              title={file}
              disabled={true}
              leadingIcon={
                <div className="h-5 w-5 overflow-hidden flex justify-center items-center">
                  <ProgressIndicator determinate={false} className="h-5 w-5" />
                </div>
              }
            />
          ))}
        </List>

        <Button
          variant="filled"
          color="primary"
          className="fixed right-0 bottom-0 shadow-lg py-4.5 pl-4.5 pr-5.5 rounded-2xl m-5 text-lg"
          onClick={handleExport}
          disabled={courses.length === 0 || loading.length > 0}
          icon="save_alt"
        >
          Export
        </Button>
      </div>
    </>
  );
};

export default NavigationPanel;
export type { NavigationPanelProps };