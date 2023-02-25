import { useState } from "react";

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
          <CourseInfo
            hours="H(3-2T)"
            department="Computer Science"
            description="This course is an introduction to the design and analysis of algorithms. Topics include: algorithmic problem solving, algorithmic efficiency, sorting and searching, divide-and-conquer, greedy algorithms, dynamic programming, and graph algorithms. Prerequisite: CSE 143 or equivalent."
          />
          <Tabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          {editingAssessment === null ? (
            <div
              className={classnames(
                "w-full",
                selectedTab === Tab.Document && "hidden md:block",
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
            <div className={classnames(selectedTab === Tab.Document && "hidden md:block")}>
              <EditAssessment
                assessment={editingAssessment.assessment}
                onClose={() => setEditingAssessment(null)}
                onSave={(assessment: Assessment) => {
                  onChangeAssessment(assessment, editingAssessment.index ?? -1);
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