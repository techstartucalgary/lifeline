import { classnames } from "../../Utilities";
import Button from "../../components/Button";

interface AppTopBarProps {
  title: string;
  subtitle?: string;
  elevation?: "flat" | "on-scroll";
}

const AppTopBar = ({ title, subtitle, elevation = "flat" }: AppTopBarProps) => {
  return (
    <div
      className={classnames(
        "flex flex-row bg-surface",
        "px-4 md:px-8",
        "pt-48 md:pt-28", "pb-4 md:pb-2",
        "before:bg-transparent before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0",
        (elevation === "on-scroll") && "before:bg-primary/8",
        "transition-all before:transition-all"
      )}
    >
      <div className="flex flex-row text-left grow items-center">
        <div className="space-y-1 grow">
          <h1 className="text-4xl mt-auto text-on-surface font-headline font-bold md:text-2xl">
            {title}
          </h1>
          <h2 className="text-base font-normal text-outline">{subtitle}</h2>
        </div>

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