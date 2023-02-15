import React from "react";
import { classnames } from "../../Utilities";
import Button from "../Button";
import blob from "./blob-small.svg";

const Row = ({
  icon,
  rightElement,
}: {
  icon?: string;
  rightElement: React.ReactElement;
}) => (
  <>
    <div
      className={classnames(
        "col-span-1",
        "border",
        "flex",
        "row-span-1",
        "items-center",
        "justify-center"
      )}
    >
      {icon && (
        <div className="relative h-[4rem] w-[4rem]">
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
              "text-3xl"
            )}
          >
            {icon}
          </span>
        </div>
      )}
    </div>
    <div
      className={classnames(
        "col-span-5",
        "border",
        "row-span-1",
        "flex",
        "items-center",
        "justify-center"
      )}
    >
      {rightElement}
    </div>
  </>
);

const EditAssessment = () => {
  return (
    // A grid with two columns but the first column is 1/5 the width of the second column
    <div
      className={classnames(
        "grid",
        "grid-cols-6",
        "h-full",
        "py-20",
        "px-10"
      )}
    >
      <div className={classnames("col-span-5")}>
        <h1 className={classnames("text-4xl", "font-bold", "text-on-surface")}>
          Edit assessment
        </h1>
      </div>
      <div className={classnames("col-span-1", " flex justify-end")}>
        <span className={classnames("material-symbols-outlined", "text-4xl")}>
          close
        </span>
      </div>
      <Row
        icon="label"
        rightElement={
          <input
            className="w-full rounded-xl"
            type="text"
            placeholder="Assignment 1"
          />
        }
      />
      <Row
        rightElement={
          <input className="w-full rounded-xl" type="datetime-local" />
        }
      />
      <Row
        icon="text_snippet"
        rightElement={
          <div className="w-full">
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-xl"
                placeholder="Enter value"
                value={"5.0"}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-xl">%</span>
              </div>
            </div>
          </div>
        }
      />
      <Row
        rightElement={
          <input
            className="w-full rounded-xl"
            type="text"
            placeholder="Location"
          />
        }
      />
      <Row
        rightElement={
          <input
            className="w-full rounded-xl"
            type="text"
            placeholder="Modality"
          />
        }
      />
      <Row
        rightElement={
          <Button variant="filled" className="text-3xl h-10">
            <span className="material-symbols-outlined">add</span>
          </Button>
        }
      />
      <Row
        icon="speaker_notes"
        rightElement={
          <textarea
            className="w-full h-full rounded-xl block"
            value="Late submission policy applied"
          />
        }
      />
      <div className="col-span-6 flex justify-center items-center">
        <Button variant="filled" className="text-lg h-10">
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditAssessment;

const test = () => {
  return (
    <div className="relative">
      <input
        type="text"
        className="pl-3 pr-10 py-2 border rounded-lg w-full"
        placeholder="Enter value"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span className="text-gray-500">%</span>
      </div>
    </div>
  );
};

// export default test;
