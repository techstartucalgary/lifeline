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
        <h1 className="text-sys-primary font-bold uppercase">Assessments</h1>
        <Button
          variant="filled"
          className="px-5 py-2"
          onClick={() =>
            onAssessmentClick(
              {
                name: "New Assessment",
                date: new Date().toISOString(),
                weight: "0",
              },
              assessments.length
            )
          }
        >
          <span className="material-symbols-outlined text-4xl">add</span>
        </Button>
      </div>
      <ul className="flex flex-col">
        {assessments.map((assessment, index) => (
          <AssessmentCard
            key={index}
            assessment={assessment}
            onAssessmentClick={() => onAssessmentClick(assessment, index)}
          />
        ))}
      </ul>
    </>
  );
};

export default AssessmentsPanel;
export type { AssessmentPanelProp };
