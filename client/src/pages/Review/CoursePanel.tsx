import { useState } from "react";

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
import MoreBottomSheet from "../../components/MoreBottomSheet/MoreBottomSheet";
import BottomSheet from "../../components/MoreBottomSheet/MoreBottomSheet";
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
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

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
              onClick={() => setTimeout(() => setBottomSheetOpen(true), 10)}
            />
          </TrailingIcon>

          {/* Titles */}
          <Title>
            {course.title} {course.number}
          </Title>
          <Subtitle>{course.topic}</Subtitle>
        </AppTopBar>
      </div>

      <div className="flex flex-col md:flex-row" style={{ paddingLeft: left }}>
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
        <BottomSheet
          isOpen={bottomSheetOpen}
          onClose={() => setBottomSheetOpen(false)}
        />
      </div>
    </>
  );
};

export default CoursePanel;
export type { CoursePanelProp };
