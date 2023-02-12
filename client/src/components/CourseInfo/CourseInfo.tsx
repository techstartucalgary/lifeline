import { useState } from "react";
import { classnames } from "../../Utilities";
import Button from "../Button";

interface CourseInfoProps {
  title?: string;
  description: string;
  onClick: () => void;
  className?: string;
}

const BentoBase = [
  "flex",
  "flex-col",
  "p-4",
  "m-2",
  "rounded-3xl",
  "bg-primary-95",
  "hover:bg-primary-90",
  "transition-all",
  "text-left",
];

const CourseInfo = () => {
  return (
    <>
      <div className={classnames("flex", "flex-row")}>
        <button className={classnames(...BentoBase, "w-1/2")}>
          <h1 className={classnames("text-lg", "font-bold")}>Hours</h1>
          <p>H(3-2)T</p>
        </button>
        <button className={classnames(...BentoBase, "w-1/2")}>
          <h1 className={classnames("text-lg", "font-bold")}>
            Department / Faculty
          </h1>
          <p>Computer Science, Science</p>
        </button>
      </div>
      <Description />
    </>
  );
};

export default CourseInfo;

const Description = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <button className={classnames(...BentoBase, "w-full")}>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus
        dolorem nam delectus ullam praesentium ea?
        {showMore &&
          " Unde nihil dicta illum consequuntur at explicabo corrupti, expedita, atque modi maiores, temporibus et officiis."}
      </p>
      <p
        className={classnames("text-secondary")}
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Less" : "More"}
      </p>
    </button>
  );
};
