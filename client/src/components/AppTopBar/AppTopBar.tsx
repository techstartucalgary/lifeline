import { HTMLAttributes } from "react";

import { classnames } from "../../Utilities";
import Button from "../../components/Button";

interface AppTopBarProps  extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  elevation?: "flat" | "on-scroll";
}

const AppTopBar = ({ title, subtitle, elevation = "flat", className, ...args }: AppTopBarProps) => {
  return (
    <div
      className={classnames(
        "flex flex-row bg-surface",
        "px-4 md:px-6",
        "pt-40 md:pt-24", "pb-4 md:pb-4",
        "before:opacity-0 before:bg-primary/8 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0",
        (elevation === "on-scroll") && "before:opacity-100",
        "transition-all before:transition-all before:ease-standard before:pointer-events-none",
        className
      )}
      {...args}
    >
      <div className="grow space-y-1">
        <h1 className={classnames("text-on-surface font-headline font-bold", "text-3xl md:text-3xl")}>
          {title}
        </h1>
        <h2 className={classnames("text-outline font-medium", "text-xl md:text-lg")}>{subtitle}</h2>
      </div>

      <div>
        <Button className="hidden md:inline text-on-surface-variant">
          <span className="material-symbols-outlined">error</span>
        </Button>
        <Button className="hidden md:inline text-on-surface-variant">
          <span
            className="material-symbols-outlined"
          >
            delete
          </span>
        </Button>
      </div>
    </div>
  );
};

export default AppTopBar;