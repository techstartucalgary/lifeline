import { useState } from "react";
import { classnames } from "../../Utilities";
import Button from "../Button";
import blob from "./blob-small.svg";

const EditAssessment = () => {
  const [name, setName] = useState("Assignment 1");
  const [date, setDate] = useState("2021-10-21T18:00:00.000");
  const [weight, setWeight] = useState("5.0");
  const [location, setLocation] = useState("Location");
  const [modality, setModality] = useState("Modality");
  const [notes, setNotes] = useState("Late submission policy applied.");

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) return;
    setWeight(e.target.value);
  };

  return (
    <form className="w-full grid grid-cols-7 py-20 px-10 gap-4">
      <h1 className="col-span-6 text-2xl font-bold text-on-surface">
        Edit assessment
      </h1>
      <button>
        <span className="col-span-1 material-symbols-outlined text2xl text-right">
          close
        </span>
      </button>
      <BlobIcon icon="label" />
      <input
        className="col-span-6 rounded-xl"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="datetime-local"
        className="col-start-2 col-span-6 rounded-xl"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <BlobIcon icon="text_snippet" />
      <div className="col-start-2 col-span-6 rounded-xl relative">
        <input
          type="text"
          className="w-full rounded-xl"
          placeholder="Enter value"
          value={weight}
          onChange={handleWeightChange}
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <span className="text-xl">%</span>
        </div>
      </div>
      <input
        type="text"
        className="col-start-2 col-span-6 rounded-xl"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        className="col-start-2 col-span-6 rounded-xl"
        value={modality}
        onChange={(e) => setModality(e.target.value)}
      />
      <div className="col-start-2 col-span-6 flex flex-row justify-center items-center">
        <Button
          variant="filled"
          className="text-3xl h-10 text-center flex flex-row justify-center items-center px-4"
        >
          <span className="material-symbols-outlined">add</span>
        </Button>
      </div>
      {/* Start the next row */}
      <BlobIcon icon="speaker_notes" />
      <textarea
        className="col-start-2 col-span-6 rounded-xl h-40"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className="col-start-1 col-span-7 flex justify-center items-center">
        <Button variant="filled">Save</Button>
      </div>
    </form>
  );
};

export default EditAssessment;

const BlobIcon = ({ icon }: { icon: string }) => {
  return (
    <div className="relative w-10 h-10 col-start-1 col-span-1">
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
