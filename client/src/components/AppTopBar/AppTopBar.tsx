import { HTMLAttributes } from "react";
import { Link, useParams } from "react-router-dom";
import { classnames } from "../../Utilities";

interface AppTopBarProps extends HTMLAttributes<HTMLDivElement> {
  courseId: string | undefined;
  description: string | undefined;
}

const AppTopBar = ({ courseId, description }: AppTopBarProps) => {
  const format = (courseId: string | undefined) => courseId?.replace("-", " ").toUpperCase();

  return (
    <div className="flex flex-row flex-1 bg-sys-surface w-full mb-0 pt-8 pb-0">
      <div className="flex flex-row text-left flex-1 items-center ml-4">
        <div className="flex-1">
          <h1 className="text-4xl mt-auto text-on-surface font-headline font-bold sm:text-2xl">
            {format(courseId)}
          </h1>
          <h2 className="text-base font-normal text-outline">
            {description}
          </h2>
        </div>
        
        <span className={classnames("material-symbols-outlined", "md:inline", "hidden")}>error</span>
        <span className={classnames("material-symbols-outlined", "md:inline ml-4 mr-3", "hidden")}>delete</span>
      </div>

    </div>
  );
};

export default AppTopBar;