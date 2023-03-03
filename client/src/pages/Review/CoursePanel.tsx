import { useState } from "react";

import { classnames } from "../../Utilities";
import CourseInfo from "../../components/CourseInfo";
import Tabs, { Tab } from "../../components/Tabs";
import { Assessment, Course } from "../../logic/icsGen";
import EditAssessment from "../../components/EditAssessment";

import AssessmentsPanel from "./AssessmentsPanel";
import DocumentPanel from "./DocumentPanel";
import { motion } from "framer-motion";

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
      <motion.div
        key={course.key}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.2, 0.0, 0, 1.0] }}
        className="flex flex-col md:flex-row"
      >
        <section className={classnames("w-full md:w-1/2", "p-4")}>
          {(course.hours || course.faculty || course.description) && (
            <CourseInfo
              hours={course.hours}
              faculty={course.faculty?.title}
              description={course.description}
            />
          )}
          <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
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
      </motion.div>
    </>
  );
};

export default CoursePanel;
export type { CoursePanelProp };
