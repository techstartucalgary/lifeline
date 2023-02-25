import { Assessment } from "../../logic/icsGen";
import { Button } from "../Button";
import { classnames } from "../../Utilities";
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

const AssessmentCard = ({
  assessment,
  onAssessmentClick,
}: AssessmentCardProps) => {
  return (
    <Button
      className={classnames(
        "w-full",
        "p-4",
        "my-1",
        "rounded-3xl",
        "bg-primary-95",
        "hover:bg-primary-90",
        "transition-all"
      )}
      onClick={() => onAssessmentClick(assessment)}
    >
      <div className="relative h-[4rem] w-[4rem] flex-shrink-0">
        <img
          src={blob}
          alt="assessment icon background"
          className={classnames(
            "absolute",
            "top-0",
            "left-0",
            "w-full",
            "h-full"
          )}
        />
        <span
          className={classnames(
            "material-symbols-outlined",
            "absolute",
            "top-1/2",
            "left-1/2",
            "transform",
            "-translate-x-1/2",
            "-translate-y-1/2",
            "text-white",
            "text-3xl"
          )}
        >
          {/* If assessment name contains any of the keywords, use the star icon, otherwise use the event icon */}
          {assessment.name
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
            : "event"}
        </span>
      </div>
      <div
        className={classnames("flex", "flex-col", "items-start", "text-left")}
      >
        <h1 className="font-bold text-sys-on-primary-container">
          {assessment.name}
        </h1>
        <h2 className="text-sm">{formatDate(assessment.date)}</h2>
        <p className="text-sys-outline mt-2 text-sm font-normal">
          Weight: {assessment.weight}
          <br />
          {"Hello, additional information can be added here. This is a placeholder. Additional information can be added here. This is a placeholder."
            .split(" ")
            .slice(0, Math.floor((assessment.name.charCodeAt(5) + 1) % 2) * 22)
            .join(" ")}
        </p>
      </div>
    </Button>
  );
};

export default AssessmentCard;
export type { AssessmentCardProps };
