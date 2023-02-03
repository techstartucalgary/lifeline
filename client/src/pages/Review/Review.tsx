import { useParams, Link } from "react-router-dom";
import Button from "../../components/Button";

const courses = ["cpsc-413", "seng-513", "cpsc-481", "cpsc-449", "cpsc-457"];

const Review = () => {
  const { courseId } = useParams();
  const format = (courseId: string | undefined) => courseId?.replace("-", " ").toUpperCase();

  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-600 h-full fixed left-0 top-0">
        <div className="flex flex-col h-full">
          {courses.map((course) => (
            <Link to={`/review/${course}`} key={course}>
              <Button variant="filled">{format(course)}</Button>
            </Link>
          ))}
        </div>
      </nav>
      <div className="flex flex-col w-full ml-64">
        {courseId ? (
          <>
            <header className="bg-gray-300 w-full p-4">COURSE NAME: {format(courseId)}</header>
            <div className="flex h-full">
              <div className="w-1/2 bg-yellow-400 p-4">
                <ul>
                  <li>Assignment 1</li>
                  <li>Assignment 2</li>
                  <li>Assignment 3</li>
                  <li>Assignment 4</li>
                  <li>Assignment 5</li>
                </ul>
              </div>
              <div className="w-1/2 bg-green-400 p-4">
                <img src="../pdf.png" alt="the pdf viewer" />
              </div>
            </div>
          </>
        ) : (
          <p>upload</p>
        )}
      </div>
    </div>
  );
};

export default Review;
