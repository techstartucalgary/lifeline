import FlatList from "flatlist-react";
import { useState } from "react";

import { classnames } from "../../Utilities";
import AssessmentCard from "../../components/AssessmentCard";
import { Button } from "../../components/Button";
import { Assessment } from "../../logic/icsGen";

import EditAssessmentDialog from "./EditAssessmentDialog";
import divider from "./divider.svg";

interface AssessmentPanelProp {
  assessments: Assessment[];
  onAssessmentsUpdate(assessments: Assessment[]): void;
}

const AssessmentsPanel = ({
  assessments,
  onAssessmentsUpdate,
}: AssessmentPanelProp) => {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const onAssessmentUpdate = (assessment: Assessment | null) => {
    assessments = assessments.map((a) =>
      (a.id === assessment?.id ? assessment : a)
    );
    onAssessmentsUpdate(assessments);
  };

  const renderAssessment = (assessment: Assessment, key: string) => {
    const onAssessmentClick = () => setAssessment({ ...assessment }); // Pass a copy of the assessment
    const onAssessmentDelete = () =>
      onAssessmentsUpdate(assessments.filter((a, _) => a.id !== assessment.id));

    return (
      <li key={key} className="flex flex-row group/assessment">
        <AssessmentCard
          assessment={assessment}
          onAssessmentClick={onAssessmentClick}
        />
        <Button
          icon="delete"
          variant="tonal"
          ripple={false}
          className={classnames(
            "text-lg text-on-primary-container ml-1 overflow-hidden duration-300",
            "before:bg-primary-95 hover:before:bg-primary-90",
            "w-0 p-0 opacity-0 group-hover/assessment:w-auto group-hover/assessment:p-2.5 group-hover/assessment:opacity-100",
            "focus-within/assessment:w-auto focus-within/assessment:p-2.5 focus-within/assessment:opacity-100"
          )}
          onClick={onAssessmentDelete}
        />
      </li>
    );
  };

  return (
    <>
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
              setAssessment({
                id: `${Math.random() * 1922}`,
                date: new Date(),
                name: "",
                weight: 0,
              })
            }
          />
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
      <EditAssessmentDialog
        assessment={assessment}
        onAssessmentUpdate={onAssessmentUpdate}
      />
    </>
  );
};

export default AssessmentsPanel;
export type { AssessmentPanelProp };
