import { classnames } from "../../Utilities";
import Button from "../Button";

const NavigationDrawer = ({ courses, currentCourse }: { courses: string[], currentCourse: string | undefined }) => {
  const format = (courseId: string | undefined) => courseId?.replace("-", " ").toUpperCase();

  return (
    <div className="flex flex-col w-full md:p-4 p-0 bg-surface">
      <p className="m-5 ml-2">Courses</p>

      {courses.map((course) => (
        <Button
          variant="text"
          to={`/review/${course}`}
          key={course}
          className={`text-gray-900 mt-2 flex flex-row p-4 ${currentCourse === course && "bg-primary-90"}`}
        >
          <span className="material-icons text-gray-600 text-base flex items-center justify-center">
            {["circle", "square", "pentagon"][Math.abs(course.split("").reduce((a, b) => a + b.charCodeAt(0), 0)) % 3]}
          </span>
          <p className="flex items-center ml-2">
            {format(course)}
          </p>
          <p className="ml-auto">
            {Math.abs(course.split("").reduce((a, b) => a + b.charCodeAt(0), 0)) % 10 + 5}
          </p>
          <span className="material-icons text-gray-600 flex items-center justify-center block md:hidden">
            arrow_right
          </span>
        </Button>
      ))}
      <Button
        variant="text"
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = ".pdf";
          input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              console.log(file);
            }
          };
          input.click();
        }}
        className="text-gray-900 mt-2 p-4"
      >
        <span
          className="material-icons text-gray-600 flex items-center justify-center"
          style={{ marginLeft: "-0.4rem" }}
        >
          add
        </span>
        <p className="flex items-center ml-2">
          Add course
        </p>
      </Button>
      <hr className="border-gray-300 p-2 hidden md:block" />
      <Button variant="filled"
        // on mobile it sits in the absolute bottom right and is only as wide as the text. Has a shadow on mobile
        className={classnames("fixed", "bottom-0", "right-0", "md:relative", "p-4", "m-5", "mb-10", "md:m-0", "shadow-lg", "md:shadow-none", "rounded-2xl", "md:rounded-3xl")}
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