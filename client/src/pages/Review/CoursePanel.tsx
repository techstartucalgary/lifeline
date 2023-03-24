import { useEffect, useState } from "react";

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
  onClickBack(): void;
  onCourseUpdate(course: Course): void;
  onCourseDelete(course: Course): void;
}

const CoursePanel = ({
  course,
  left,
  onCourseUpdate,
  onClickBack,
  onCourseDelete,
}: CoursePanelProp) => {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Assessments);
  const [editingAssessment, setEditingAssessment] = useState<{
    assessment: Assessment;
    index: number;
  } | null>(null);

  useEffect(() => {
    setEditingAssessment(null);
  }, [course]);

  const onAssessmentClick = (assessment: Assessment, index: number) => {
    setEditingAssessment({ assessment, index });
  };

  const onAssessmentChange = (assessment: Assessment, index: number) => {
    course.assessments[index] = assessment;
    onCourseUpdate(course);
  };

  const onAssessmentDelete = (_: Assessment, index: number) => {
    course.assessments.splice(index, 1);
    onCourseUpdate(course);
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
              className="text-on-surface-variant hidden md:flex"
              icon="error"
            />
            <IconButton
              className="text-on-surface-variant hidden md:flex"
              icon="delete"
              onClick={() => onCourseDelete(course)}
            />
            <IconButton
              className="text-on-surface-variant flex md:hidden"
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
          {editingAssessment ? (
            <EditAssessment
              assessment={editingAssessment.assessment}
              onClose={() => setEditingAssessment(null)}
              onSave={(assessment: Assessment) => {
                onAssessmentChange(assessment, editingAssessment.index);
                setEditingAssessment(null);
              }}
            />
          ) : (
            <>
              {(course.hours || course.faculty || course.description) && (
                <CourseInfo
                  hours={course.hours}
                  faculty={course.faculty?.title}
                  description={course.description}
                />
              )}
              <div className="md:hidden border-b-2">
                <Tabs
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
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
            </>
          )}
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
    </>
  );
};

export default CoursePanel;
export type { CoursePanelProp };
