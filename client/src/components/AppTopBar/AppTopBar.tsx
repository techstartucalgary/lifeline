import { classnames } from "../../Utilities";
import Button from "../../components/Button";

interface AppTopBarProps {
  title: string | undefined;
  subtitle: string | undefined;
}

const AppTopBar = ({ title, subtitle }: AppTopBarProps) => {
  return (
    <div className={classnames("flex flex-row flex-1 bg-sys-surface", "px-4 md:px-8", "pt-48 md:pt-28", "pb-4 md:pb-2")}>
      <div className="flex flex-row text-left flex-1 items-center">
        <div className="flex-1 space-y-1">
          <h1 className="text-4xl mt-auto text-on-surface font-headline font-bold md:text-2xl">
            {title}
          </h1>
          <h2 className="text-base font-normal text-outline">{subtitle}</h2>
        </div>

        <Button className="hidden md:inline">
          <span className={classnames("material-symbols-outlined")}>error</span>
        </Button>
        <Button className="hidden md:inline">
          <span
            className={classnames("material-symbols-outlined", "ml-4", "mr-3")}
          >
            delete
          </span>
        </Button>
      </div>
    </div>
  );
};

export default AppTopBar;