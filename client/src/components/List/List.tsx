import { ReactNode } from "react";
import { Course, Courses } from "../../logic/icsGen";
import { classnames } from "../../Utilities";
import { Button, ButtonProps } from "../Button";

interface ListProps {
  courses: Courses;
  currentCourse: Course | null;
  onCoursesChanged: (courses: Courses) => void;
  onCourseClick: (course: Course) => void;
}

const List = ({courses, currentCourse, onCoursesChanged, onCourseClick}: ListProps) => {
  return (
    <>
      {
        courses.map((course) => (
          <ListItem
            key={course.key}
            title={`${course.code} ${course.number}`}
            className={classnames(currentCourse === course && "before:bg-primary-95")}
            onClick={() => onCourseClick(course)}
          />
        ))
      }
    </>
  );
};

interface ListItemProps extends ButtonProps {
  metadata?: ReactNode | string;
}

const ListItem = ({ title, metadata, icon, color = "primary", className, ...args }: ListItemProps) => { 
  return (
    <Button
      {...args}
      color={color}
      variant="text"
      className={classnames(
        "flex flex-row px-5.5 py-4.5 text-on-surface",
        className
      )}
      icon={
        <span className={classnames(
          "material-symbols-outlined variant-navigation-drawer text-xl",
          "flex justify-center items-center",
        )}>{icon}</span>
      }
    >
      <div className="flex flex-col ml-2 min-w-0">
        <p className="font-medium text-base align-middle leading-7">
          {title}
        </p>
      </div>
      <p className="ml-auto mr-1 flex items-center justify-center text-sm proportional-nums">
        {metadata}
      </p>
    </Button>
  );
};

export default List;