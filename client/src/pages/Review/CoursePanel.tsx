import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";

import { classnames } from "../../Utilities";
import { useAppTopBar } from "../../components/AppTopBar";
import { AppTopBarIconButton } from "../../components/AppTopBar/IconButton";
import { Button } from "../../components/Button";
import CourseInfo from "../../components/CourseInfo";
import EditAssessment from "../../components/EditAssessment";
import Tabs, { Tab } from "../../components/Tabs";
import { Assessment, Course } from "../../logic/icsGen";

import AssessmentsPanel from "./AssessmentsPanel";
import DocumentPanel from "./DocumentPanel";

interface CoursePanelProp {
  course: Course;
  onBack(): void;
  onCourseUpdate(course: Course): void;
  onCourseDelete(course: Course): void;
}

const CoursePanel = ({
  course,
  onBack,
  onCourseUpdate,
  onCourseDelete,
}: CoursePanelProp) => {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Assessments);
  const [isEditingAssessment, setIsEditingAssessment] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<{
    assessment: Assessment;
    index: number;
  } | null>(null);

  useEffect(() => {
    setEditingAssessment(null);
  }, [course]);

  const onOpenDialog = () => {
    setIsEditingAssessment(true);
  };

  const onCloseDialog = () => {
    setIsEditingAssessment(false);
  };

  const onAssessmentClick = (assessment: Assessment, index: number) => {
    setEditingAssessment({ assessment, index });
    setIsEditingAssessment(true);
  };

  const onAssessmentChange = (assessment: Assessment, index: number) => {
    course.assessments[index] = assessment;
    onCourseUpdate(course);
  };

  const onAssessmentDelete = (_: Assessment, index: number) => {
    course.assessments = course.assessments.filter((_, i) => i !== index);
    onCourseUpdate(course);
  };

  const containerRef = useRef(null);

  const [CompactHeadline, Headline] = useAppTopBar({
    variant: "large",
    title: `${course.title} ${course.number}`,
    subtitle: course.topic,
    containerRef,
    leadingNavigation: (
      <AppTopBarIconButton
        className="text-on-surface mr-1 flex md:hidden"
        icon="arrow_back"
        onClick={onBack}
      />
    ),
    trailingIcon: (
      <>
        <AppTopBarIconButton
          className="text-on-surface-variant hidden md:flex"
          icon="error"
        />
        <AppTopBarIconButton
          className="text-on-surface-variant hidden md:flex"
          icon="delete"
          onClick={() => onCourseDelete(course)}
        />
        <AppTopBarIconButton
          className="text-on-surface-variant flex md:hidden"
          icon="more_vert"
        />
      </>
    ),
  });

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
      <Button className="text-primary" onClick={onCloseDialog}>
        Save
      </Button>
    ),
  });

  return (
    <>
      <CompactHeadline />

      <div className="overflow-y-auto h-[calc(100vh-4rem)]" ref={containerRef}>
        <Headline />
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
          <section className={classnames("w-full md:w-1/2")}>
            {(course.hours || course.faculty || course.description) && (
              <CourseInfo
                hours={course.hours}
                faculty={course.faculty?.title}
                description={course.description}
              />
            )}
            <div className="md:hidden border-b-2">
              <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            </div>
            <div
              className={classnames(
                "w-full",
                selectedTab === Tab.Document && "hidden md:block"
              )}
            >
              <AssessmentsPanel
                assessments={course.assessments}
                onAssessmentClick={onAssessmentClick}
                onAssessmentDelete={onAssessmentDelete}
              />
            </div>
          </section>

          <section
            className={classnames(
              "p-4 mt-2 mr-2",
              "w-full md:w-1/2",
              "md:h-screen",
              "overflow-y-auto",
              "border-x border-y border-dashed border-gray-400 rounded-3xl",
              selectedTab === Tab.Assessments && "hidden md:block"
            )}
          >
            {course.file ? (
              <DocumentPanel file={course.file} />
            ) : (
              <p>File not found</p>
            )}
          </section>
        </div>
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
                <Dialog.Panel className="w-full max-w-md overflow-hidden h-screen md:h-auto md:rounded-2xl bg-surface shadow-xl transition-all">
                  <DialogCompactHeadline
                    compactTitleDisplayRange={[0, 10]}
                    elevationDisplayRange={[0, 10]}
                  />

                  <div
                    className="h-full md:h-96 overflow-y-auto px-6 py-4"
                    ref={dialogContainerRef}
                  >
                    {editingAssessment && (
                      <EditAssessment
                        assessment={editingAssessment.assessment}
                        onClose={() => setEditingAssessment(null)}
                        onSave={(assessment: Assessment) => {
                          onAssessmentChange(
                            assessment,
                            editingAssessment.index
                          );
                          setEditingAssessment(null);
                        }}
                      />
                    )}
                    <div className="pt-96"></div>
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

export default CoursePanel;
export type { CoursePanelProp };
