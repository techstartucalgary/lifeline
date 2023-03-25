import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import { classnames } from "../../Utilities";
import AppTopBar, {
  IconButton,
  LeadingNavigation,
  Subtitle,
  Title,
  TrailingIcon,
} from "../../components/AppTopBar";
import CourseInfo from "../../components/CourseInfo";
import EditAssessment from "../../components/EditAssessment";
import Tabs, { Tab } from "../../components/Tabs";
import { Assessment, Course } from "../../logic/icsGen";

import AssessmentsPanel from "./AssessmentsPanel";
import DocumentPanel from "./DocumentPanel";

interface CoursePanelProp {
  course: Course;
  left: number;
  onChangeAssessment(assessment: Assessment, index: number): void;
  onClickBack(): void;
  onDeleteCourse(): void;
}

const CoursePanel = ({
  course,
  left,
  onChangeAssessment,
  onClickBack,
  onDeleteCourse,
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

  return (
    <>
      <div className="z-10">
        <AppTopBar
          className="max-w-9xl mx-auto"
          style={{ paddingLeft: left }}
          variant="large"
        >
          {/* Icons */}
          <LeadingNavigation className="block md:hidden">
            <IconButton
              className="text-on-surface mr-1.5"
              icon="arrow_back"
              onClick={onClickBack}
            />
          </LeadingNavigation>
          <TrailingIcon>
            <IconButton
              className="text-on-surface-variant hidden md:block"
              icon="error"
            />
            <IconButton
              className="text-on-surface-variant hidden md:block"
              icon="delete"
              onClick={onDeleteCourse}
            />
            <IconButton
              className="text-on-surface-variant block md:hidden"
              icon="more_vert"
            />
          </TrailingIcon>

          {/* Titles */}
          <Title>
            {course.title} {course.number}
          </Title>
          <Subtitle>{course.topic}</Subtitle>
        </AppTopBar>
      </div>
      <div
        className="flex flex-col md:flex-row gap-4 lg:gap-6"
        style={{ paddingLeft: left }}
      >
        <section className={classnames("w-full md:w-1/2")}>
          <>
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
                onAssessmentClick={(assessment: Assessment, index: number) => {
                  setEditingAssessment({ assessment, index });
                  onOpenDialog();
                }}
              />
            </div>
          </>
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

      <Transition appear show={isEditingAssessment} as={Fragment}>
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
            <div className="fixed inset-0 md:bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-0 md:p-4 text-center will-change-auto">
              <Transition.Child
                as={Fragment}
                enter="ease-emphasized-decelerate duration-300"
                enterFrom="opacity-80 translate-y-96"
                enterTo="opacity-100 translate-y-0"
                leave="ease-emphasized-accelerate duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-80 translate-y-full"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden h-screen md:rounded-2xl bg-surface px-6 pt-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <AppTopBar
                      className="max-w-9xl mx-auto"
                      style={{ paddingLeft: left }}
                      variant="small"
                    >
                      {/* Icons */}
                      <LeadingNavigation>
                        <IconButton
                          className="text-on-surface mr-1.5"
                          icon="close"
                          onClick={onCloseDialog}
                        />
                      </LeadingNavigation>
                      <TrailingIcon>
                        <IconButton
                          className="text-on-surface-variant"
                          icon="done"
                          onClick={onCloseDialog}
                        />
                      </TrailingIcon>

                      {/* Titles */}
                      <Title>Edit essessment</Title>
                    </AppTopBar>
                  </Dialog.Title>

                  {editingAssessment && (
                    <EditAssessment
                      assessment={editingAssessment.assessment}
                      onClose={() => setEditingAssessment(null)}
                      onSave={(assessment: Assessment) => {
                        onChangeAssessment(assessment, editingAssessment.index);
                        setEditingAssessment(null);
                      }}
                    />
                  )}
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
