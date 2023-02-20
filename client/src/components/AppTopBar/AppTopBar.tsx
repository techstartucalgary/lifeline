import { HTMLAttributes } from "react";
import { classnames } from "../../Utilities";
import Button from "../../components/Button";

interface AppTopBarProps extends HTMLAttributes<HTMLDivElement> {
  courseName: string;
  description: string;
  handleBackClick: () => void;
}

const AppTopBar = ({ courseName, description, handleBackClick }: AppTopBarProps) => {
  return (
    <>
      <div className="flex flex-row justify-between md:hidden">
        <Button variant="text" className="text-on-surface-variant" onClick={handleBackClick}>
          <span className="material-symbols-outlined">arrow_back</span>
        </Button>
        <Button variant="text" className="text-on-surface-variant">
          <span className="material-symbols-outlined font-bold">more_vert</span>
        </Button>
      </div>
      <div className="flex flex-row flex-1 bg-sys-surface w-full mb-0 pt-8 pb-0">
        <div className="flex flex-row text-left flex-1 items-center ml-4">
          <div className="flex-1">
            <h1 className="text-4xl mt-auto text-on-surface font-headline font-bold md:text-2xl">
              {courseName}
            </h1>
            <h2 className="text-base font-normal text-outline">
              {description}
            </h2>
          </div>

          <Button className="hidden md:inline">
            <span
              className={classnames(
                "material-symbols-outlined",
                "text-on-surface-variant"
              )}
            >
              error
            </span>
          </Button>
          <Button className="hidden md:inline">
            <span
              className={classnames(
                "material-symbols-outlined",
                "ml-4",
                "mr-3",
                "text-on-surface-variant"
              )}
            >
              delete
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default AppTopBar;
