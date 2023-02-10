import { Assessment } from "../../logic/icsGen";
import Button from "../Button";
import { classnames } from "../../Utilities";
import blob from "./blob.svg";

interface AssessmentCardProps {
  assessment: Assessment;
  onAssessmentClick: (assessment: Assessment) => void;
}

const AssessmentCard = ({ assessment, onAssessmentClick }: AssessmentCardProps) => {
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
  }

  return (
    <Button
      className={classnames(
        "p-4",
        "my-1",
        "rounded-3xl",
        "bg-primary-95",
        "hover:bg-primary-90",
        "transition-all",
        "hover:before:bg-transparent" // partially dealing with bug in Button.tsx
      )}
      onClick={() => onAssessmentClick(assessment)}
    >
      <div className="relative h-[4rem] w-[4rem] flex-shrink-0">
        <img
          src={blob}
          alt="assessment icon background"
          className={classnames("absolute", "top-0", "left-0", "w-full", "h-full")}
        />
        <span
          className={classnames(
            "material-icons",
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
          {
            ["event", "star"][Math.floor((assessment.name.charCodeAt(0) + 1) % 2)] // TODO: replace with a better way to determine icon
          }
        </span>
      </div>
      <div className={classnames("flex", "flex-col", "items-start", "text-left")}>
        <h1 className="font-bold text-sys-on-tertiary-container">{assessment.name}</h1>
        <h2>{formatDate(assessment.date)}</h2>
        <p className="text-sys-outline mt-2">
          Weight: {assessment.weight}
          <br />
          {"Hello, additional information can be added here. This is a placeholder. Additional information can be added here. This is a placeholder."
            .split(" ")
            .slice(0, Math.floor(Math.random() * 22))
            .join(" ")}
        </p>
      </div>
    </Button>
  );
};

export default AssessmentCard;
export type { AssessmentCardProps };
