import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { IconButton } from "./components/Button";

const BottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Button to open the bottom sheet */}
      <button onClick={openModal}>Open Bottom Sheet</button>

      {/* Bottom Sheet */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity bg-primary-30 bg-opacity-30" />
            </Transition.Child>

            {/* Bottom Sheet Content */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="rounded-t-2xl bg-surface-variant flex flex-row justify-center p-4 gap-1 w-full">
                <span className="flex flex-col justify-start w-1/5 items-center text-center">
                  <IconButton icon="add" />
                  <label>Add assessment</label>
                </span>
                <span className="flex flex-col justify-start w-1/5 items-center text-center">
                  <IconButton icon="delete" />
                  <label>Delete course</label>
                </span>
                <span className="flex flex-col justify-start w-1/5 items-center text-center">
                  <IconButton icon="error" />
                  <label>Report</label>
                </span>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BottomSheet;
