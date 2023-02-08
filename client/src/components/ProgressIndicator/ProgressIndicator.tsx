
import { HTMLAttributes } from "react";

import { classnames } from "../../Utilities";

import styles from "./ProgressIndicator.module.css";

interface ProgressIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  determinate: false; // TODO: Implement determinate progress
  progress?: number;
  strokeWidth?: number | string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProgressIndicator = ({ determinate, className, strokeWidth = "0.5rem" }: ProgressIndicatorProps) => {
  return (
    <>
      <span className={classnames(styles.container, "stroke-primary h-8 w-8", className)} role="progressbar">
        <svg className="rounded-full" viewBox="22 22 44 44">
          <circle className={styles.circle} cx="44" cy="44" r="20.2" fill="none" strokeWidth={strokeWidth}></circle>
        </svg>
      </span>
    </>
  );
};

export default ProgressIndicator;
export type { ProgressIndicatorProps };