import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";

import { IconButton } from "../Button";

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={true}
          onRequestClose={onClose}
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
          className="fixed bottom-0 left-0 right-0"
          closeTimeoutMS={200}
        >
          <motion.div
            className="flex flex-col items-center  bg-red-100 rounded-t-lg p-4"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(event, info) => {
              if (info.offset.y > 100) {
                onClose();
              }
            }}
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
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
