import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { IconButton } from "../Button";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const BottomSheet = ({ isOpen, onClose }: BottomSheetProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-primary-30 bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto flex justify-center">
          <Transition.Child
            as={Fragment}
            // comes and goes from the bottom
            enter="transform transition ease-out duration-300"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transform transition ease-in duration-200"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <Dialog.Panel className="rounded-t-2xl bg-surface-variant flex flex-row justify-center p-4 gap-1 transition-all fixed bottom-0">
              <span className="flex flex-col justify-start w-1/3 items-center text-center">
                <IconButton icon="add" />
                <label>Add assessment</label>
              </span>
              <span className="flex flex-col justify-start w-1/3 items-center text-center">
                <IconButton icon="delete" />
                <label>Delete course</label>
              </span>
              <span className="flex flex-col justify-start w-1/3 items-center text-center">
                <IconButton icon="error" />
                <label>Report</label>
              </span>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BottomSheet;
