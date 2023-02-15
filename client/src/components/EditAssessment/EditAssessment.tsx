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
        "bg-gray-300",
        "border",
        "flex",
        "row-span-1",
        "items-center"
      )}
    >
      {icon && (
        <div className="relative h-[4rem] w-[4rem] text-right bg-red-200">
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
              "material-icons",
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
        "bg-blue-300",
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
        "grid-rows-12",
        "h-full",
        "py-20",
        "px-10",
        "bg-green-100"
      )}
    >
      <div className={classnames("col-span-5", "bg-blue-200")}>
        <h1 className={classnames("text-4xl", "font-bold", "text-on-surface")}>
          Edit assessment
        </h1>
      </div>
      <div className={classnames("col-span-1", "bg-gray-200 flex justify-end")}>
        <span className={classnames("material-icons", "text-4xl")}>close</span>
      </div>
      <Row
        icon="label"
        rightElement={
          <input className="w-full" type="text" placeholder="Assignment 1" />
        }
      />
      <Row rightElement={<input className="w-full" type="datetime-local" />} />
      <Row
        icon="text_snippet"
        rightElement={
          <div className="bg-red-200 w-full">
            <input className="w-full" type="text" value={"5.0"} />
          </div>
        }
      />
      <Row
        rightElement={
          <input className="w-full" type="text" placeholder="Location" />
        }
      />
      <Row
        rightElement={
          <input className="w-full" type="text" placeholder="Modality" />
        }
      />
      <Row
        rightElement={
          // negative 4 y margin
          <Button variant="filled" className="-my-4">
            <span className="material-icons text-5xl">add</span>
          </Button>
        }
      />
      <Row
        icon="speaker_notes"
        rightElement={
          <input
            className="w-full h-full"
            type="text"
            value="Late submission policy applied"
          />
        }
      />
      <div className="col-span-6 bg-blue-200 flex justify-center items-center">
        <Button variant="filled" className="text-3xl">
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditAssessment;
