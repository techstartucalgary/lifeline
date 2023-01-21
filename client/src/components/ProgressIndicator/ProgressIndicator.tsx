
import { HTMLAttributes } from "react";

import { classnames } from "../../Utilities";

import "./ProgressIndicator.css";

interface ProgressIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  determinate: false; // TODO: Implement determinate progress
  progress?: number;
  strokeWidth?: number | string;
}

const ProgressIndicator = ({ determinate, className, strokeWidth = "0.5rem" }: ProgressIndicatorProps) => {
  return (
    <>
      <span className={classnames("css-n9w9ys stroke-primary h-8 w-8", className)} role="progressbar">
        <svg className="rounded-full" viewBox="22 22 44 44">
          <circle className="css-14891ef" cx="44" cy="44" r="20.2" fill="none" strokeWidth={strokeWidth}></circle>
        </svg>
      </span>
    </>
  );
};

export default ProgressIndicator;
