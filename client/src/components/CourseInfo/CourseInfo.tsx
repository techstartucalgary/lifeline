import { useState } from "react";
import { classnames } from "../../Utilities";

interface CourseInfoProps {
  hours: string;
  department: string;
  description: string;
}

const BentoBase = [
  "flex",
  "flex-col",
  "p-4",
  "my-2",
  "rounded-3xl",
  "bg-primary-95",
  "hover:bg-primary-90",
  "transition-all",
  "text-left",
];

const CourseInfo = ({ hours, department, description }: CourseInfoProps) => {
  return (
    <>
      <div
        className={classnames(
          "flex",
          "flex-row",
          "gap-4",
          "text-sys-on-secondary-container"
        )}
      >
        <div className={classnames(...BentoBase, "md:w-1/2")}>
          <h1 className={classnames("text-lg", "font-bold")}>Hours</h1>
          <p>{hours}</p>
        </div>
        <div className={classnames(...BentoBase, "md:w-1/2", "flex-grow")}>
          <h1 className={classnames("text-lg", "font-bold")}>
            Department / Faculty
          </h1>
          <p>{department}</p>
        </div>
      </div>
      <Description text={description} />
    </>
  );
};

export default CourseInfo;

const Description = ({ text }: { text: string }) => {
  const [showMore, setShowMore] = useState(false);
  
  const maxChars = 150;
  const overflow = text.length > maxChars;

  return (
    <button
      className={classnames(
        ...BentoBase,
        "w-full",
        "mb-4",
        "text-sys-on-secondary-container"
      )}
      onClick={() => setShowMore(!showMore)}
    >
      <p>
        {overflow ? (showMore ? text : text.slice(0, maxChars) + "...") : text}
      </p>
      <p>{overflow && (showMore ? "Less" : "More")}</p>
    </button>
  );
};
