import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { IconButton } from "../Button";

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      console.log(containerRef.current);
      console.log(event.target);

      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        console.log("closing bottom sheet");
        onClose();
      } else {
        console.log("clicked inside bottom sheet");
      }
    };

    if (isOpen) {
      console.log("adding event listener");
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose, isOpen]);

  const variants = {
    open: { y: 0 },
    closed: { y: "100%" },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-lg overflow-hidden z-10"
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          transition={{ duration: 0.2 }}
          ref={containerRef}
        >
          <div className="flex justify-between items-center px-4 py-2">
            <h2 className="font-medium text-lg">Bottom Sheet</h2>
            <button onClick={onClose}>
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-2 px-4 py-2">
            <button className="px-4 py-2 bg-gray-200 rounded-md">
              Button 1
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-md">
              Button 2
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-md">
              Button 3
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

type MyComponentProps = {};

const MyComponent: React.FC<MyComponentProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openBottomSheet = () => {
    console.log("opening bottom sheet");
    setTimeout(() => {
      setIsOpen(true);
    }, 10);
  };

  const closeBottomSheet = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openBottomSheet} id="open-button">
        Open Bottom Sheet
      </button>
      <BottomSheet isOpen={isOpen} onClose={closeBottomSheet} />
    </div>
  );
};

const MoreBottomSheet = () => {
  return (
    // Rounded top corners
    <div className="rounded-t-2xl bg-surface-variant flex flex-row justify-center p-4 gap-1">
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
  );
};

export default MyComponent;
