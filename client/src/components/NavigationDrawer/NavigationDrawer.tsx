import Button from "../Button";

const NavigationDrawer = ({ courses, currentCourse }: { courses: string[], currentCourse: string | undefined }) => {
  const format = (courseId: string | undefined) => courseId?.replace("-", " ").toUpperCase();

  return (
    <div className="flex flex-col h-full w-full p-4">
      <p className="m-5 ml-2">Courses</p>

      {courses.map((course) => (
        <Button
          variant="text"
          to={`/review/${course}`}
          key={course}
          className={`text-gray-900 mt-2 flex flex-row p-4 ${currentCourse === course && "bg-primary-90"}`}
        >
          {/* Random choice of shape: circle, triangle, square, pentagon, based on the hash of the name */}
          <span className="material-icons text-gray-600 text-base flex items-center justify-center">
            {["circle", "square", "pentagon"][Math.abs(course.split("").reduce((a, b) => a + b.charCodeAt(0), 0)) % 3]}
          </span>
          <p className="flex items-center ml-2">
            {format(course)}
          </p>
          {/* Random int between 3 and 15, should be at the right end of the button */}
          <p className="ml-auto">
            {Math.abs(course.split("").reduce((a, b) => a + b.charCodeAt(0), 0)) % 10 + 5}
          </p>
        </Button>
      ))}
      {/* File upload button (html input) */}
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
      <hr className="border-gray-300 p-2" />
      <Button variant="filled"
        className="p-4 rounded-3xl"
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
      {/* <Button
        variant="text"
        className={"text-gray-900 mt-2 flex flex-row p-4 bg-primary-90"}
      >
        <span className="material-icons text-gray-600 text-base flex items-center justify-center">
          add
        </span>
        <p className="flex items-center ml-2">
          Add
        </p>
      </Button> */}
    </div >
  );
};

export default NavigationDrawer;