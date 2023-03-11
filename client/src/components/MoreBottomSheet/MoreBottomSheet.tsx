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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MyComponent = () => {
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

export default BottomSheet;
