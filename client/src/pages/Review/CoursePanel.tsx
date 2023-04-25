import { useCallback, useRef, useState } from "react";

import { classnames } from "../../Utilities";
import { useAppTopBar } from "../../components/AppTopBar";
import { AppTopBarIconButton } from "../../components/AppTopBar/IconButton";
import CourseInfo from "../../components/CourseInfo";
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
  const containerRef = useRef(null);

  const onAssessmentsUpdate = useCallback(
    (assessments: Assessment[]) => onCourseUpdate({ ...course, assessments }),
    [course, onCourseUpdate]
  );

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
                onAssessmentsUpdate={onAssessmentsUpdate}
              />
            </div>
          </section>

          <section
            className={classnames(
              "p-4 mt-2 mr-2 rounded-3xl bg-surface",
              "w-full md:w-1/2",
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
    </>
  );
};

export default CoursePanel;
export type { CoursePanelProp };
