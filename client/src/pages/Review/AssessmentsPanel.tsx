import { Dialog, Transition } from "@headlessui/react";
import FlatList from "flatlist-react";
import { Fragment, useRef, useState } from "react";
import { useEffectOnce } from "react-use";

import { classnames } from "../../Utilities";
import useAppTopBar from "../../components/AppTopBar";
import { AppTopBarIconButton } from "../../components/AppTopBar/IconButton";
import AssessmentCard from "../../components/AssessmentCard";
import { Button } from "../../components/Button";
import EditAssessment from "../../components/EditAssessment";
import { Assessment } from "../../logic/icsGen";

import divider from "./divider.svg";

interface AssessmentPanelProp {
  assessments: Assessment[];
  onAssessmentsUpdate(assessments: Assessment[]): void;
}

const AssessmentsPanel = ({
  assessments,
  onAssessmentsUpdate,
}: AssessmentPanelProp) => {
  const [isEditingAssessment, setIsEditingAssessment] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(
    null
  );
  const [editingAssessmentIndex, setEditingAssessmentIndex] =
    useState<number>(-1);

  useEffectOnce(() => setEditingAssessment(null));

  const onOpenDialog = () => {
    setIsEditingAssessment(true);
  };

  const onCloseDialog = () => {
    setIsEditingAssessment(false);
  };

  const onAssessmentClick = (assessment: Assessment, index: number) => {
    setEditingAssessment(assessment);
    setEditingAssessmentIndex(index);
    onOpenDialog();
  };

  const onAssessmentChange = (assessment: Assessment, index: number) => {
    assessments[index] = assessment;
    onAssessmentsUpdate(assessments);
  };

  const onAssessmentDelete = (_: Assessment, index: number) => {
    assessments = assessments.filter((_, i) => i !== index);
    onAssessmentsUpdate(assessments);
  };

  const dialogContainerRef = useRef(null);
  const [DialogCompactHeadline] = useAppTopBar({
    variant: "small",
    title: "Edit assesssment",
    containerRef: dialogContainerRef,
    leadingNavigation: (
      <AppTopBarIconButton
        className="text-on-surface mr-1.5"
        icon="close"
        onClick={onCloseDialog}
      />
    ),
    trailingIcon: (
      <Button
        className="text-primary"
        onClick={() => {
          if (editingAssessment) {
            onAssessmentChange(editingAssessment, editingAssessmentIndex);
          }
          onCloseDialog();
        }}
      >
        Save
      </Button>
    ),
  });

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
            "text-lg text-on-primary-container ml-1 overflow-hidden duration-300",
            "before:bg-primary-95 hover:before:bg-primary-90",
            "w-0 p-0 opacity-0 group-hover/assessment:w-auto group-hover/assessment:p-2.5 group-hover/assessment:opacity-100",
            "focus-within/assessment:w-auto focus-within/assessment:p-2.5 focus-within/assessment:opacity-100"
          )}
          onClick={() => onAssessmentDelete(assessment, parseInt(index))}
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
              onAssessmentClick(
                {
                  name: "New Assessment",
                  date: new Date(),
                  weight: 0,
                },
                assessments.length
              )
            }
          ></Button>
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

      <Transition show={isEditingAssessment} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsEditingAssessment(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 md:bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="flex min-h-full items-center justify-center p-0 md:p-4 text-center will-change-auto">
              <Transition.Child
                as={Fragment}
                enter="ease-emphasized-decelerate duration-300 will-change-auto"
                enterFrom="opacity-80 translate-y-96"
                enterTo="opacity-100 translate-y-0"
                leave="ease-emphasized-accelerate duration-200 will-change-auto"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-80 translate-y-full"
              >
                <Dialog.Panel className="w-full max-w-lg overflow-hidden h-screen md:h-auto md:rounded-2xl bg-surface shadow-xl transition-all">
                  <DialogCompactHeadline
                    compactTitleDisplayRange={[0, 10]}
                    elevationDisplayRange={[0, 10]}
                  />

                  <div
                    className="h-full md:h-96 overflow-y-auto px-4 py-4"
                    ref={dialogContainerRef}
                  >
                    {editingAssessment && (
                      <EditAssessment
                        assessment={editingAssessment}
                        onAssessmentChange={setEditingAssessment}
                      />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AssessmentsPanel;
export type { AssessmentPanelProp };
