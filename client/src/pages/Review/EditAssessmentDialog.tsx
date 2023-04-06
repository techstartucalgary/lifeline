import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";

import useAppTopBar from "../../components/AppTopBar";
import { AppTopBarIconButton } from "../../components/AppTopBar/IconButton";
import { Button } from "../../components/Button";
import EditAssessment from "../../components/EditAssessment";
import { Assessment } from "../../logic/icsGen";

interface EditAssessmentDialogProp {
  assessment: Assessment | null;
  onAssessmentUpdate(assessment: Assessment | null): void;
}

const EditAssessmentDialog = ({
  assessment: originalAssessment,
  onAssessmentUpdate: onOriginalAssessmentUpdate,
}: EditAssessmentDialogProp) => {
  // Editing Panel
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (originalAssessment) setAssessment(originalAssessment);
    setOpen(originalAssessment !== null);
  }, [originalAssessment]);

  const close = () => setOpen(false);
  const save = () => {
    onOriginalAssessmentUpdate(assessment);
    close();
  };

  // Editing Panel Topbar
  const dialogContainerRef = useRef(null);
  const [CompactHeadline] = useAppTopBar({
    variant: "small",
    title: "Edit assesssment",
    containerRef: dialogContainerRef,
    leadingNavigation: (
      <AppTopBarIconButton
        className="text-on-surface mr-1.5"
        icon="close"
        onClick={close}
      />
    ),
    trailingIcon: (
      <Button className="text-primary" onClick={save}>
        Save
      </Button>
    ),
  });

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 md:bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="flex min-h-full items-center justify-center p-0 md:p-4 text-center will-change-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-emphasized-decelerate duration-300 will-change-auto"
              enterFrom="opacity-80 translate-y-96"
              enterTo="opacity-100 translate-y-0"
              leave="ease-emphasized-accelerate duration-200 will-change-auto"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-80 translate-y-full"
            >
              <Dialog.Panel className="w-full max-w-lg overflow-hidden h-screen md:h-auto md:rounded-2xl bg-surface shadow-xl transition-all">
                <CompactHeadline
                  compactTitleDisplayRange={[0, 10]}
                  elevationDisplayRange={[0, 10]}
                />

                <div
                  className="h-full md:h-96 overflow-y-auto px-4 py-4"
                  ref={dialogContainerRef}
                >
                  {assessment && (
                    <EditAssessment
                      assessment={assessment}
                      onAssessmentChange={setAssessment}
                    />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditAssessmentDialog;
