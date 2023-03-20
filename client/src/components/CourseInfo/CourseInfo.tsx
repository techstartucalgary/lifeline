import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";

import { classnames } from "../../Utilities";
import { Button } from "../Button";

interface CourseInfoProps {
  hours?: string;
  faculty?: string;
  description?: string;
}

const base = [
  "flex flex-col items-start gap-0",
  "px-4 py-4.5 text-left font-normal rounded-[1.375rem]",
  "bg-tertiary-95 hover:before:bg-state-layers-on-primary-container/5 focus:before:bg-transparent",
  "transition-all pointer-events-none",
];

const CourseInfo = ({ hours, faculty, description }: CourseInfoProps) => {
  return (
    <div className="flex flex-col gap-3 text-sys-on-tertiary-container mx-4 md:mx-0">
      <div className="flex flex-row gap-3">
        <Button
          variant="tonal"
          color="tertiary"
          className={classnames(...base, "w-1/3 md:w-1/2")}
        >
          <h1 className="font-medium">Hours</h1>
          <p>H({hours})</p>
        </Button>
        <Button
          variant="tonal"
          color="tertiary"
          className={classnames(...base, "md:w-1/2 flex-grow")}
        >
          <h1 className="font-medium">Faculty</h1>
          <p>{faculty}</p>
        </Button>
      </div>
      {description && <Description text={description} />}
    </div>
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

    if (showMore) paragraphRef.current.classList.remove("line-clamp-3");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, paragraphRef.current, width]);

  return (
    <Button
      variant="tonal"
      color="tertiary"
      ripple={false}
      className={classnames(
        ...base,
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
