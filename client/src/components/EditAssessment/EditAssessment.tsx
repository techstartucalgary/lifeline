import { useState } from "react";
import { classnames } from "../../Utilities";
import Button from "../Button";
import blob from "./blob-small.svg";
import { Assessment } from "../../logic/icsGen";

interface EditAssessmentProps {
  onClose: () => void;
  onSave: (assessment: Assessment) => void;
  assessment: Assessment;
}

const EditAssessment = ({
  onClose,
  onSave,
  assessment,
}: EditAssessmentProps) => {
  const [name, setName] = useState(assessment.name);
  const [date, setDate] = useState(assessment.date);
  const [weight, setWeight] = useState(assessment.weight);
  const [location, setLocation] = useState("");
  const [modality, setModality] = useState("");
  const [notes, setNotes] = useState("Late submission policy applied.");

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value.trim()))) return;
    setWeight(e.target.value.trim());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({
      name,
      date,
      weight,
    });
  };

  return (
    <form
      className="w-full bg-surface flex flex-col gap-4 text-on-surface"
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Edit assessment</h1>
        <button type="button" onClick={onClose}>
          <span className="material-symbols-outlined text2xl text-right">
            close
          </span>
        </button>
      </div>

      <div className="flex flex-row w-full h-14">
        <BlobIcon icon="label" />
        <div className="relative w-full ml-2">
          {/* Adapted from https://flowbite.com/docs/forms/floating-label/ */}
          <input
            type="text"
            id="assessment_name"
            className="block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-xl peer"
            placeholder=" "
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label
            htmlFor="assessment_name"
            className="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Name
          </label>
        </div>
      </div>
      <div className="flex flex-row w-full h-14">
        <div className="w-14"></div>
        <input
          type="datetime-local"
          className="rounded-xl w-full ml-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="flex flex-row w-full h-14">
        <BlobIcon icon="text_snippet" />
        <div className="relative w-full ml-2">
          <input
            type="text"
            id="assessment_name"
            className="block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-xl peer"
            placeholder=" "
            onChange={handleWeightChange}
            value={weight}
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-xl">%</span>
          </div>
          <label
            htmlFor="assessment_name"
            className="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
            className="block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-xl peer"
            placeholder=" "
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
          <label
            htmlFor="assessment_location"
            className="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Location
          </label>
        </div>
      </div>
      <div className="flex flex-row w-full h-14">
        <div className="w-14"></div>
        <div className="relative w-full ml-2">
          <input
            type="text"
            id="assessment_modality"
            className="block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-xl peer"
            placeholder=" "
            onChange={(e) => setModality(e.target.value)}
            value={modality}
          />
          <label
            htmlFor="assessment_modality"
            className="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Modality
          </label>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="w-14"></div>
        <Button
          type="button"
          onClick={(e) => e.preventDefault()}
          variant="filled"
          className="text-3xl h-10 text-center flex flex-row justify-center items-center px-4"
        >
          <span className="material-symbols-outlined">add</span>
        </Button>
      </div>
      <div className="flex flex-row w-full h-14">
        <BlobIcon icon="speaker_notes" />
        <div className="relative w-full ml-2">
          <textarea
            id="assessment_notes"
            className="block px-2.5 pb-2.5 pt-4 w-full bg-transparent rounded-xl peer h-48"
            placeholder=" "
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
          <label
            htmlFor="assessment_notes"
            className="absolute duration-300 transform -translate-y-4 scale-75 top-2 z-10 bg-white px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Notes
          </label>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Button type="submit" variant="filled" className="mt-36">
          Save
        </Button>
      </div>
    </form>
  );
};

export default EditAssessment;

const BlobIcon = ({ icon }: { icon: string }) => {
  return (
    <div className="relative w-14">
      <img
        src={blob}
        alt="icon background"
        className={classnames(
          "absolute",
          "top-0",
          "left-0",
          "w-full",
          "h-full"
        )}
      />
      <span
        className={classnames(
          "material-symbols-outlined",
          "absolute",
          "top-1/2",
          "left-1/2",
          "transform",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "text-primary",
          "text-xl"
        )}
      >
        {icon}
      </span>
    </div>
  );
};
