import FlatList from "flatlist-react";

import { classnames } from "../../Utilities";
import AssessmentCard from "../../components/AssessmentCard";
import { Button } from "../../components/Button";
import { Assessment } from "../../logic/icsGen";

import divider from "./divider.svg";

interface AssessmentPanelProp {
  assessments: Assessment[];
  onAssessmentClick(assessment: Assessment, index: number): void;
  onAssessmentDelete(assessment: Assessment, index: number): void;
}

const AssessmentsPanel = ({
  assessments,
  onAssessmentClick,
  onAssessmentDelete,
}: AssessmentPanelProp) => {
  const renderAssessment = (assessment: Assessment, index: string) => {
    return (
      <li key={index} className="flex flex-row group/assessment">
        <AssessmentCard
          assessment={assessment}
          onAssessmentClick={() =>
            onAssessmentClick(assessment, parseInt(index))
          }
        />
        <Button
          icon="delete"
          variant="tonal"
          ripple={false}
          className={classnames(
            "text-sm text-on-primary-container ml-1 overflow-hidden duration-300",
            "before:bg-primary-95 hover:before:bg-primary-90",
            "w-0 p-0 opacity-0 group-hover/assessment:w-auto group-hover/assessment:p-2.5 group-hover/assessment:opacity-100"
          )}
          onClick={() => onAssessmentDelete(assessment, parseInt(index))}
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
          variant="tonal"
          className={classnames(
            "px-3.5 py-0.5 absolute top-1/2 -translate-y-1/2",
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
          <span className="material-symbols-outlined text-2xl text-primary">
            add
          </span>
        </Button>
      </div>
      <ul className="flex flex-col space-y-2 px-2 py-4 md:px-0 md:py-0">
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
