import { useState } from "react";
import Sticky from "react-stickynode";
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
  const tabs: Tab[] = [{ name: "Assessments" }, { name: "Document" }];

  const [selectedTab, setSelectedTab] = useState<number>(0);
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
            "p-4 mt-2 mr-2",
            "w-full md:w-1/2",
            "md:h-screen",
            "overflow-y-auto",
            "overflow-x-hidden",
            "border-x border-y border-dashed border-gray-400 rounded-3xl w-full mt-2"
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

        <Sticky enabled={true} top="#compact-headline" bottomBoundary={1200}>
          <Tabs
            tabs={tabs}
            tab={selectedTab}
            onChangeTab={(_, index) => setSelectedTab(index)}
          />
        </Sticky>

        <SwipeableViews
          index={selectedTab}
          onChangeIndex={(index: number) =>
            setTimeout(() => setSelectedTab(index), 60)
          }
          disableLazyLoading={true}
          hysteresis={0.8}
          resistance={true}
          springConfig={{
            duration: "0.4s",
            delay: "0s",
            easeFunction: "cubic-bezier(0.2, 0.0, 0, 1.0)",
          }}
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
