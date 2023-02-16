import { HTMLAttributes } from "react";
import { Link, useParams } from "react-router-dom";
import { classnames } from "../../Utilities";
import Button from "../../components/Button";

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
          <h1 className="text-4xl mt-auto text-on-surface font-headline font-bold md:text-2xl">
            {format(courseId)}
          </h1>
          <h2 className="text-base font-normal text-outline">
            {description}
          </h2>
        </div>
        
        <Button>
          <span className={classnames("material-symbols-outlined", "md:block", "hidden")}>error</span>
        </Button>
        <Button>
          <span className={classnames("material-symbols-outlined", "md:block ml-4 mr-3", "hidden")}>delete</span>
        </Button>
        
      </div>

    </div>
  );
};

export default AppTopBar;