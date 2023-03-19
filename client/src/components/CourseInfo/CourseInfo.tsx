import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";

import { classnames } from "../../Utilities";
import { Button } from "../Button";

interface CourseInfoProps {
  hours?: string;
  faculty?: string;
  description?: string;
}

const BentoBase = [
  "flex flex-col items-start gap-0",
  "p-4 my-2 text-left font-normal",
  "rounded-3xl",
  "bg-tertiary-95 hover:before:bg-state-layers-on-primary-container/5 focus:before:bg-transparent",
  "transition-all pointer-events-none",
];

const CourseInfo = ({ hours, faculty, description }: CourseInfoProps) => {
  return (
    <>
      <div
        className={classnames(
          "flex",
          "flex-row",
          "gap-3.5", // visual correction
          "text-sys-on-tertiary-container"
        )}
      >
        <Button
          variant="tonal"
          color="tertiary"
          className={classnames(...BentoBase, "md:w-1/2")}
        >
          <h1 className={classnames("text-lg", "font-medium")}>Hours</h1>
          <p>{hours}</p>
        </Button>
        <Button
          variant="tonal"
          color="tertiary"
          className={classnames(...BentoBase, "md:w-1/2 flex-grow")}
        >
          <h1 className={classnames("text-lg", "font-medium")}>Faculty</h1>
          <p>{faculty}</p>
        </Button>
      </div>
      {description && <Description text={description} />}
    </>
  );
};

export default CourseInfo;

const Description = ({ text }: { text: string }) => {
  const { width } = useWindowSize();

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, paragraphRef.current, width]);

  return (
    <Button
      variant="tonal"
      color="tertiary"
      ripple={false}
      className={classnames(
        ...BentoBase,
        "w-full mb-4",
        clampable && "pointer-events-auto"
      )}
      onClick={() => setShowMore(!showMore)}
    >
      <p ref={paragraphRef} className={showMore ? "" : "line-clamp-3"}>
        {text}
      </p>
      {clampable && (
        <p className="font-medium uppercase text-sm mt-2 text-tertiary">
          {showMore ? "Less" : "More"}
        </p>
      )}
    </Button>
  );
};
