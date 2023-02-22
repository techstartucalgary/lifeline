import { HTMLAttributes } from "react";
import { classnames } from "../../Utilities";
import AssessmentCard from "../../components/AssessmentCard";
import { Button } from "../../components/Button";
import { Assessment } from "../../logic/icsGen";

interface AssessmentProp extends HTMLAttributes<HTMLDivElement> {
  assessments: Assessment[];
  onAssessmentClick(assessment: Assessment, index: number): void;
}

const Assessment = ({ assessments, onAssessmentClick, ...args }: AssessmentProp) => {
  return (
    <>
      <div
        {...args}
      >
        <div
          className={classnames(
            "hidden md:flex md:flex-row",
            "w-full justify-between items-center mb-3"
          )}
        >
          <h1
            className="text-sys-primary font-bold uppercase"
          >
            Assessment
          </h1>
          <Button
            variant="filled"
            className="px-5 py-2"
          >
            <span className="material-symbols-outlined text-4xl">
              add
            </span>
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
      </div>
    </>
  );
};

export default Assessment;
export type { AssessmentProp };