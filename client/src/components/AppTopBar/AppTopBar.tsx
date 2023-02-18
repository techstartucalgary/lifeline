import { HTMLAttributes } from "react";

import { classnames } from "../../Utilities";
import { IconButton } from "../../components/Button";

interface AppTopBarProps  extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  elevation?: "flat" | "on-scroll";
}

const AppTopBar = ({ title, subtitle, elevation = "flat", className, ...args }: AppTopBarProps) => {
  return (
    <div
      className={classnames(
        "bg-surface",
        "before:opacity-0 before:bg-primary/8 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0",
        "transition-all before:transition-all before:ease-standard before:pointer-events-none",
        (elevation === "on-scroll") && "before:opacity-100",
        className
      )}
      {...args}
    >
      <div className="flex flex-row px-1 pt-2">
        <div className="p-1">
          <IconButton className="text-on-surface-variant" icon="arrow_back" />
        </div>
        <div className="flex flex-row">
          <div className="p-1">
            
          </div>
        </div>
      </div>

      {/* Title section */}
      <div className={classnames("flex flex-row items-center pt-10 px-4", "pb-5 md:pb-5")}>
        <div className="grow space-y-1">
          <h1 className={classnames("text-on-surface font-headline font-bold", "text-3xl md:text-3xl")}>
            {title}
          </h1>
          <h2 className={classnames("text-outline font-medium", "text-xl md:text-lg")}>{subtitle}</h2>
        </div>

        <div>
          <IconButton className="hidden md:inline text-on-surface-variant" icon="error" />
          <IconButton className="hidden md:inline text-on-surface-variant" icon="delete" />
        </div>
      </div>
    </div>
  );
};

export default AppTopBar;