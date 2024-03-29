import { classnames } from "../../Utilities";
import ProgressIndicator from "../../components/ProgressIndicator";

import wfh2 from "./wfh_2.svg";

export default function Loading() {
  return (
    <div
      className={classnames(
        "h-screen",
        "flex flex-col justify-center items-center",
        "text-lg sm:text-xl",
      )}
    >
      <div className={classnames(
      )}>
        <img
          src={wfh2}
          alt="a boy delivering a package by driving a scooter"
          className={classnames(
            "w-9/12",
            "min-w-[330px], min-w-[270px]",
            "max-w-[600px], max-h-[409px]",
            "mx-auto",
          )}
        />
      </div>
      <div className="mt-[30px]">
        <p
          className={classnames(
            "w-full",
            "font-semibold",
          )}
        >We’re preparing it for you on the cloud...
        </p>
      </div>
      <div className="mt-[24px]">
        <ProgressIndicator determinate={false} />
      </div>
    </div >
  );
}
