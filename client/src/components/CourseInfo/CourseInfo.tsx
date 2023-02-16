import { useEffect, useRef, useState } from "react";
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
  "bg-secondary-95",
  "hover:bg-secondary-90",
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
  const [clampable, setClampable] = useState(true);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!paragraphRef.current) return;
    paragraphRef.current.classList.remove("line-clamp-3");
    const originalHeight = paragraphRef.current.clientHeight;
    paragraphRef.current.classList.add("line-clamp-3");
    const clampedHeight = paragraphRef.current.clientHeight;
    setClampable(originalHeight !== clampedHeight);
  }, [text]);

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
      <p ref={paragraphRef} className={showMore ? "" : "line-clamp-3"}>
        {text}
      </p>
      <p>{clampable && (showMore ? "LESS" : "MORE")}</p>
    </button>
  );
};