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
      <div className="hidden md:flex md:flex-row">
        <section className={classnames("w-full md:w-1/2", "p-4")}>
          {(course.hours || course.faculty || course.description) && (
            <CourseInfo
              hours={course.hours}
              faculty={course.faculty?.title}
              description={course.description}
            />
          )}

          {editingAssessment === null ? (
            <div className="w-full">
              <AssessmentsPanel
                assessments={course.assessments}
                onAssessmentClick={(assessment: Assessment, index: number) => {
                  setEditingAssessment({ assessment, index });
                }}
              />
            </div>
          ) : (
            <div>
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

        <section className={classnames("p-4", "w-full md:w-1/2")}>
          <DocumentPanel />
        </section>
      </div>

      {/* Mobile screen */}
      <section className="md:hidden">
        {(course.hours || course.faculty || course.description) && (
          <div className="p-4 pb-2">
            <CourseInfo
              hours={course.hours}
              faculty={course.faculty?.title}
              description={course.description}
            />
          </div>
        )}

        <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        <SwipeableViews
          index={selectedTab === Tab.Assessments ? 0 : 1}
          onChangeIndex={(index: number) =>
            setSelectedTab(index === 0 ? Tab.Assessments : Tab.Document)
          }
        >
          <div className="p-4">
            <AssessmentsPanel
              assessments={course.assessments}
              onAssessmentClick={(assessment: Assessment, index: number) => {
                setEditingAssessment({ assessment, index });
              }}
            />
          </div>
          <div className="p-4">
            <DocumentPanel />
          </div>
        </SwipeableViews>
      </section>
    </>
  );
};

export default CoursePanel;
export type { CoursePanelProp };
