import axios from "axios";
import { classnames } from "../../Utilities";
import Button from "../Button";
import { Response } from "../../logic/icsGen";

const NavigationDrawer = ({ data, currentCourse, setData }:
  { data: Response, currentCourse: string | undefined, setData: (data: Response) => void }) => {
  const format = (courseId: string | undefined) => courseId?.replace("-", " ").toUpperCase();
  const unformat = (courseId: string | undefined) => courseId?.replace(" ", "-").toLowerCase();

  const handleOutlineUpload = (e: any) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++)
      formData.append("outline_files", files[i]);


    axios.post("/files", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(res => {
        setData({ ...data, ...res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col w-full md:p-4 p-0 bg-surface">
      <p className="m-5 ml-2 font-bold">Courses</p>

      {data && Object.entries(data).map(([course, courseData]) => (
        <Button
          variant="text"
          to={`/review/${unformat(course)}`}
          key={course}
          className={classnames(
            "text-gray-900",
            "mt-2",
            "flex",
            "flex-row",
            "p-4",
            currentCourse === format(course) && "bg-primary-90",
          )}
        >
          <span className="material-icons text-gray-600 text-base flex items-center justify-center">
            {["circle", "square", "pentagon"][Math.abs(course.split("").reduce((a, b) => a + b.charCodeAt(0), 0)) % 3]}
          </span>
          <div className="flex flex-col ml-2 min-w-0">
            <p className="flex items-center font-bold">
              {format(course)}
            </p>
            <p className={classnames("truncate", "md:hidden")}>
              {/* {courseData.topic}  */}
              The course.course descriptions can be quite long, so we truncate them to save space.
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
      <Button
        variant="text"
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = ".pdf";
          // allow multiple files to be uploaded
          input.multiple = true;
          input.onchange = handleOutlineUpload;
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
        <p className="flex items-center ml-2"
          style={{ transform: "translateX(-0.4rem)", }}>
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