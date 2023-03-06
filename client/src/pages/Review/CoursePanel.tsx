import { useState } from "react";
import SwipeableViews from "react-swipeable-views";

import { classnames } from "../../Utilities";
import CourseInfo from "../../components/CourseInfo";
import Tabs, { Tab } from "../../components/Tabs";
import { Assessment, Course } from "../../logic/icsGen";
import EditAssessment from "../../components/EditAssessment";

import AssessmentsPanel from "./AssessmentsPanel";
import DocumentPanel from "./DocumentPanel";

interface CoursePanelProp {
  course: Course;
  onChangeAssessment(assessment: Assessment, index: number): void;
}

const CoursePanel = ({ course, onChangeAssessment }: CoursePanelProp) => {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Assessments);
  const [editingAssessment, setEditingAssessment] = useState<{
    assessment: Assessment;
    index: number;
  } | null>(null);

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <section className={classnames("w-full md:w-1/2", "p-4")}>
          {(course.hours || course.faculty || course.description) && (
            <CourseInfo
              hours={course.hours}
              faculty={course.faculty?.title}
              description={course.description}
            />
          )}

          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

          <div className="-mx-4">
            <SwipeableViews
              index={selectedTab === Tab.Assessments ? 0 : 1}
              onChangeIndex={(index: number) =>
                setSelectedTab(index === 0 ? Tab.Assessments : Tab.Document)
              }
            >
              <div className="px-4">
                <AssessmentsPanel
                  assessments={course.assessments}
                  onAssessmentClick={(
                    assessment: Assessment,
                    index: number
                  ) => {
                    setEditingAssessment({ assessment, index });
                  }}
                />
              </div>
              <div className="px-4">
                <DocumentPanel />
              </div>
            </SwipeableViews>
          </div>

          {editingAssessment === null ? (
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
                }}
              />
            </div>
          ) : (
            <div
              className={classnames(
                selectedTab === Tab.Document && "hidden md:block"
              )}
            >
              <EditAssessment
                assessment={editingAssessment.assessment}
                onClose={() => setEditingAssessment(null)}
                onSave={(assessment: Assessment) => {
                  onChangeAssessment(assessment, editingAssessment.index);
                  setEditingAssessment(null);
                }}
              />
            </div>
          )}
        </section>

        <section
          className={classnames(
            "p-4",
            "w-full md:w-1/2",
            selectedTab === Tab.Assessments && "hidden md:block"
          )}
        >
          <DocumentPanel />
        </section>
      </div>
    </>
  );
};

export default CoursePanel;
export type { CoursePanelProp };
