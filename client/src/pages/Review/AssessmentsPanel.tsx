import FlatList from "flatlist-react";

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
  const renderAssessment = (assessment: Assessment, index: string) => {
    return (
      <li key={index}>
        <AssessmentCard
          assessment={assessment}
          onAssessmentClick={() =>
            onAssessmentClick(assessment, parseInt(index))
          }
        />
      </li>
    );
  };

  return (
    <div className="group">
      <div
        className={classnames(
          "hidden md:flex md:flex-col relative",
          "w-full justify-between items-center py-4 mb-3"
        )}
      >
        <img src={divider} className="w-full" aria-hidden alt="divider" />
        <Button
          icon="add"
          variant="tonal"
          className={classnames(
            "px-3 py-1.5 absolute top-1/2 -translate-y-1/2 text-lg text-on-primary-container",
            "transition-all ease-emphasized-decelerate",
            "invisible opacity-0 group-hover:visible group-hover:opacity-100",
            "[@media(hover:none)]:visible [@media(hover:none)]:opacity-100"
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
        </Button>
      </div>
      <ul className="flex flex-col space-y-2">
        <FlatList
          list={assessments}
          renderItem={renderAssessment}
          renderOnScroll
          sortBy="date"
        />
      </ul>
    </div>
  );
};

export default AssessmentsPanel;
export type { AssessmentPanelProp };
