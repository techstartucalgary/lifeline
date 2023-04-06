import { Assessment } from "../../logic/icsGen";

import blob from "./blob-small.svg";

interface EditAssessmentProps {
  assessment: Assessment;
  onAssessmentChange: (assessment: Assessment) => void;
}

const EditAssessment = ({
  assessment,
  onAssessmentChange,
}: EditAssessmentProps) => {
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value.trim()))) {
      return;
    }
    if (e.target.value.trim() === "") {
      onAssessmentChange({ ...assessment, weight: 0 });
      return;
    }
    onAssessmentChange({
      ...assessment,
      weight: Number(e.target.value.trim()),
    });
  };

  const jsxInputFormat = (date: Date): string => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const hours = `${date.getHours()}`.padStart(2, "0");
    const minutes = `${date.getMinutes()}`.padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="flex flex-col gap-4 text-on-surface">
      <div className="flex flex-row w-full h-14">
        <BlobIcon icon="label" />
        <div className="relative w-full ml-2">
          {/* Adapted from https://flowbite.com/docs/forms/floating-label/ */}
          <input
            type="text"
            id="assessment_name"
            className="block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-xl peer appearance-none border-outline-variant caret-primary"
            placeholder=""
            value={assessment.name}
            onChange={(e) =>
              onAssessmentChange({ ...assessment, name: e.target.value })
            }
          />
          <label
            htmlFor="assessment_name"
            className="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-surface px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Name
          </label>
        </div>
      </div>
      <div className="flex flex-row w-full h-14">
        <div className="w-14"></div>
        <input
          type="datetime-local"
          className="rounded-xl w-full ml-2 bg-transparent border-outline-variant"
          value={jsxInputFormat(assessment.date)}
          onChange={(e) =>
            onAssessmentChange({
              ...assessment,
              date: new Date(e.target.value),
            })
          }
        />
      </div>
      <div className="flex flex-row w-full h-14">
        <BlobIcon icon="text_snippet" />
        <div className="relative w-full ml-2">
          <input
            type="text"
            id="assessment_weight"
            className="block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-xl peer border-outline-variant"
            placeholder=" "
            value={assessment.weight}
            onChange={handleWeightChange}
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-xl">%</span>
          </div>
          <label
            htmlFor="assessment_weight"
            className="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-surface px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Weight
          </label>
        </div>
      </div>
      <div className="flex flex-row w-full h-14">
        <div className="w-14"></div>
        <div className="relative w-full ml-2">
          <input
            type="text"
            id="assessment_location"
            className="block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-xl peer border-outline-variant"
            placeholder=" "
            onChange={(e) =>
              onAssessmentChange({ ...assessment, location: e.target.value })
            }
            value={assessment.location}
          />
          <label
            htmlFor="assessment_location"
            className="absolute duration-300 rounded-full transform -translate-y-4 scale-75 top-2 z-10 bg-surface px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Location
          </label>
        </div>
      </div>
      <div className="flex flex-row w-full h-14">
        <BlobIcon icon="speaker_notes" />
        <div className="relative w-full ml-2">
          <textarea
            id="assessment_notes"
            className="block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-xl peer h-48 border-outline-variant caret-primary"
            placeholder=" "
            onChange={(e) =>
              onAssessmentChange({ ...assessment, notes: e.target.value })
            }
            value={assessment.notes}
          />
          <label
            htmlFor="assessment_notes"
            className="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-surface px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Notes
          </label>
        </div>
      </div>
    </div>
  );
};

export default EditAssessment;

const BlobIcon = ({ icon }: { icon: string }) => {
  return (
    <div className="relative w-14 flex flex-row justify-center items-center">
      <img
        src={blob}
        alt="icon background"
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className="material-symbols-outlined text-primary text-xl">
        {icon}
      </div>
    </div>
  );
};
