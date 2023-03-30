import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import { useEffectOnce } from "react-use";

import { IconButton } from "./components/Button";

const MyDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffectOnce(() => {
    setTimeout(() => setIsOpen(true), 1000);
    console.log("Dialog opened");
  });

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Open/close</button>
      <Transition
        show={isOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        // as={Fragment}
      >
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              className="mx-auto max-w-sm fixed bottom-0 rounded-t-2xl bg-surface-variant flex flex-row justify-center p-4 gap-1"
              role="dialog"
              aria-modal="true"
            >
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
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MyDialog;
