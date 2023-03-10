import { useState } from "react";
import SwipeableViews from "react-swipeable-views";

import { classnames } from "../../Utilities";
import AppTopBar, {
  LeadingNavigation,
  TrailingIcon,
  Title,
  Subtitle,
} from "../../components/AppTopBar";
import { IconButton } from "../../components/Button";
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
  const [editingAssessment, setEditingAssessment] = useState<{
    assessment: Assessment;
    index: number;
  } | null>(null);

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
              className="text-on-surface"
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

      <div className="hidden md:flex md:flex-row" style={{ paddingLeft: left }}>
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

        <section
          className={classnames(
            "p-4 mr-2",
            "w-full md:w-1/2",
            "h-screen",
            "overflow-y-auto",
            "overflow-x-hidden",
            "border-x border-y border-dashed border-gray-400 rounded-3xl w-full mt-2",
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

      {/* Mobile screen */}
      <div className="md:hidden">
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
            <DocumentPanel file={course.file} />
          </div>
        </SwipeableViews>
      </div>
    </>
  );
};

export default CoursePanel;
export type { CoursePanelProp };
