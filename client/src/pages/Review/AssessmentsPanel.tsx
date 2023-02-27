import { classnames } from "../../Utilities";
import AssessmentCard from "../../components/AssessmentCard";
import { Button } from "../../components/Button";
import { Assessment } from "../../logic/icsGen";

import divider from "./divider.svg";

interface AssessmentPanelProp {
  assessments: Assessment[];
  onAssessmentClick(assessment: Assessment, index: number): void;
}

const AssessmentsPanel = ({
  assessments,
  onAssessmentClick,
}: AssessmentPanelProp) => {
  return (
    <div className="group">
      <div
        className={classnames(
          "hidden md:flex md:flex-col relative",
          "w-full justify-between items-center py-4 mb-3"
        )}
      >
        <img src={divider} className="w-full" />
        <Button
          variant="tonal"
          className={classnames(
            "px-3.5 py-0.5 absolute top-1/2 -translate-y-1/2",
            "transition-all ease-emphasized-decelerate",
            "invisible opacity-0 group-hover:visible group-hover:opacity-100"
          )}
          onClick={() =>
            onAssessmentClick(
              {
                name: "New Assessment",
                date: new Date(),
                weight: 0,
              },
              assessments.length
            )
          }
        >
          <span className="material-symbols-outlined text-2xl text-primary">
            add
          </span>
        </Button>
      </div>
      <ul className="flex flex-col">
        {assessments
          .sort((a: Assessment, b: Assessment) => (a.date > b.date ? 1 : -1))
          .map((assessment, index) => (
            <li key={index}>
              <AssessmentCard
                assessment={assessment}
                onAssessmentClick={() => onAssessmentClick(assessment, index)}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AssessmentsPanel;
export type { AssessmentPanelProp };
