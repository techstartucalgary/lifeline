import axios from "axios";
import { useRef } from "react";

import { classnames } from "../../Utilities";
import { useAppTopBar } from "../../components/AppTopBar";
import { AppTopBarIconButton } from "../../components/AppTopBar/IconButton";
import { Button, IconButton } from "../../components/Button";
import List from "../../components/List";
import NavigationDrawer from "../../components/NavigationDrawer";
import NavigationRail from "../../components/NavigationRail";
import ProgressIndicator from "../../components/ProgressIndicator";
import jsonToICS, { Course, Courses } from "../../logic/icsGen";

import symbols from "./symbols";

const generateIcon = (courseKey: string) =>
  symbols[courseKey] || symbols["default"];

interface NavigationPanelProps {
  courses: Courses;
  currentCourse: Course | null;
  onCourseClick(course: Course | null): void;
  onOutlineUpload(e: React.ChangeEvent<HTMLInputElement>): void;
  loading: string[];
}

const NavigationPanel = ({
  courses,
  currentCourse,
  onCourseClick,
  onOutlineUpload,
  loading,
}: NavigationPanelProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    const ics = jsonToICS(courses);
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "deadlines.ics";
    link.click();

    await axios
      .post("/xlsx", courses, {
        responseType: "blob",
      })
      .then((response) => {
        return response.data;
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "deadlines.xlsx";
        document.body.appendChild(a); // append the element to the dom
        a.click();
        a.remove(); // afterwards, remove the element
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [CompactHeadline, Headline] = useAppTopBar({
    variant: "medium",
    title: "Courses",
    trailingIcon: (
      <AppTopBarIconButton
        icon="add"
        className="text-on-surface"
        onClick={() => {
          inputRef.current?.click();
        }}
        disabled={loading.length > 0}
      />
    ),
  });

  return (
    <>
      <div className="hidden md:hidden xl:block p-3">
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          multiple
          onChange={onOutlineUpload}
          className="hidden"
          aria-hidden
          id="file-upload"
        />

        <NavigationDrawer title="Courses">
          {courses &&
            courses.map((course, t) => (
              <NavigationDrawer.Item
                key={t}
                title={`${course.code} ${course.number}`}
                metadata={course.assessments.length}
                onClick={() => onCourseClick(course)}
                selected={course === currentCourse}
                ripple={currentCourse !== course}
                icon={generateIcon(course.title)}
              />
            ))}

          {loading.length > 0 && (
            <div className="flex flex-col w-full">
              {loading.map((file, t) => (
                <NavigationDrawer.Item
                  key={t}
                  title={file}
                  disabled={true}
                  icon={
                    <div className="h-5 w-5 overflow-hidden flex justify-center items-center">
                      <ProgressIndicator
                        determinate={false}
                        className="h-5 w-5"
                      />
                    </div>
                  }
                />
              ))}
            </div>
          )}

          <Button
            variant="text"
            color="secondary"
            className="rounded-[20px] p-4 text-secondary font-normal"
            onClick={() => {
              inputRef.current?.click();
            }}
            icon="add"
            disabled={loading.length > 0}
          >
            Add course
          </Button>

          <hr className="border-gray-300 p-2 mx-6 hidden md:block" />

          <Button
            variant="filled"
            color="primary"
            className="rounded-[20px] p-4"
            onClick={handleExport}
            disabled={courses.length === 0 || loading.length > 0}
            icon="save_alt"
          >
            Export
          </Button>
        </NavigationDrawer>
      </div>
      <div className="hidden md:flex xl:hidden">
        <NavigationRail>
          <IconButton
            icon="save_alt"
            variant="filled"
            color="primary"
            className="rounded-2xl mt-4 mb-7 w-14 h-14 mx-auto"
            onClick={handleExport}
          />

          {courses &&
            courses.map((course, t) => (
              <NavigationRail.Item
                key={t}
                title={`${course.code} ${course.number}`}
                onClick={() => onCourseClick(course)}
                icon={generateIcon(course.title)}
                selected={course === currentCourse}
              />
            ))}

          {loading.length > 0 && (
            <div className="flex flex-col w-full">
              {loading.map((file, t) => (
                <NavigationRail.Item
                  key={t}
                  title={file}
                  disabled={true}
                  icon={
                    <div className="h-5 w-5 overflow-hidden flex justify-center items-center">
                      <ProgressIndicator
                        determinate={false}
                        className="h-5 w-5"
                      />
                    </div>
                  }
                />
              ))}
            </div>
          )}

          <IconButton
            onClick={() => {
              inputRef.current?.click();
            }}
            icon="add"
            variant="text"
            color="primary"
            className="rounded-2xl mx-auto w-14 text-center"
            iconClassName="text-on-primary-container text-2xl md:text-2xl"
            disabled={loading.length > 0}
          />
        </NavigationRail>
      </div>
      <div className="block md:hidden xl:hidden">
        <CompactHeadline />
        <Headline />
        <List>
          {courses &&
            courses.map((course, t) => (
              <List.Item
                key={t}
                title={`${course.code} ${course.number}`}
                supportingText={course.topic}
                metadata={
                  <p className="rounded-full bg-tertiary-95 py-1.5 w-7">
                    {course.assessments.length}
                  </p>
                }
                onClick={() => onCourseClick(course)}
                className={classnames(
                  currentCourse === course && "bg-primary-container"
                )}
                ripple={currentCourse !== course}
                leadingIcon={generateIcon(course.title)}
                trailingIcon="arrow_right"
              />
            ))}

          {loading.length > 0 &&
            loading.map((file, t) => (
              <List.Item
                key={t}
                title={file}
                disabled={true}
                leadingIcon={
                  <div className="h-5 w-5 overflow-hidden flex justify-center items-center">
                    <ProgressIndicator
                      determinate={false}
                      className="h-5 w-5"
                    />
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
