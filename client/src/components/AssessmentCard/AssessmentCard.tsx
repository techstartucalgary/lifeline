import { classnames } from "../../Utilities";
import { Assessment } from "../../logic/icsGen";
import { Button } from "../Button";

import blob from "./blob.svg";

interface AssessmentCardProps {
  assessment: Assessment;
  onAssessmentClick: (assessment: Assessment) => void;
}

const formatDate = (date: Date): string =>
  date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

const getIcon = (name: string): string => {
  // If assessment name contains any of the keywords, use the star icon, otherwise use the event icon
  return name
    .toLowerCase()
    .split(" ")
    .some((word) =>
      [
        // Star icon keywords
        "test",
        "quiz",
        "final",
        "midterm",
        "exam",
        "examination",
        "evaluation",
        "presentation",
        "project",
      ].includes(word)
    )
    ? "star"
    : "event";
};

const AssessmentCard = ({
  assessment,
  onAssessmentClick,
}: AssessmentCardProps) => {
  return (
    <Button
      className={classnames(
        "w-full p-4 rounded-[1.375rem] flex-col justify-center items-start font-normal",
        "bg-primary-95 hover:bg-primary-90"
      )}
      onClick={() => onAssessmentClick(assessment)}
    >
      <div className="flex flex-row space-x-2.5 justify-center items-center">
        <div className="relative h-12 w-12 flex flex-row justify-center items-center">
          <img
            src={blob}
            className="absolute -z-10"
            alt="assessment icon background"
          />
          <span className="material-symbols-outlined text-white text-xl">
            {getIcon(assessment.name)}
          </span>
        </div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-medium text-sys-on-primary-container">
            {assessment.name}
          </h1>
          <h2 className="">{formatDate(assessment.date)}</h2>
        </div>
      </div>

      <p className="text-on-primary-container">
        Weight: {assessment.weight}%
        <br />
        {assessment.notes}
      </p>
    </Button>
  );
};

export default AssessmentCard;
export type { AssessmentCardProps };
