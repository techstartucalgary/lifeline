import { classnames } from "../../Utilities";
import AssessmentCard from "../../components/AssessmentCard";
import { Button } from "../../components/Button";
import { Assessment } from "../../logic/icsGen";

interface AssessmentPanelProp {
  assessments: Assessment[];
  onAssessmentClick(assessment: Assessment, index: number): void;
}

const AssessmentsPanel = ({
  assessments,
  onAssessmentClick,
}: AssessmentPanelProp) => {
  return (
    <>
      <div
        className={classnames(
          "hidden md:flex md:flex-row",
          "w-full justify-between items-center mb-3"
        )}
      >
        <h1 className="text-sys-primary font-bold uppercase">Assessment</h1>
        <Button variant="filled" className="px-5 py-2">
          <span className="material-symbols-outlined text-4xl">add</span>
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
    </>
  );
};

export default AssessmentsPanel;
export type { AssessmentPanelProp };
