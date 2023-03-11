import { IconButton } from "../Button";

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

export default MoreBottomSheet;
