import { classnames } from "../../Utilities";

import illustration14 from "./illustration14.svg";
import circularIndicator from "./circularIndicator.svg";
import "./Loading.css";

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
          src={illustration14}
          alt="a boy sitting on a piece of cloud working on his work"
          className={classnames(
            "w-9/12",
            "min-w-[330px], min-w-[270px]",
            "max-w-[600px], max-h-[409px]",
            "mx-auto",
          )}
        />
      </div>
      <div className={classnames(
        "mt-[30px]"
      )}>
        <p
          className={classnames(
            "w-full",
            "font-semibold",
          )}
        >We’re preparing it for you on the cloud...
        </p>
      </div>
      <div className={classnames(
        "mt-[24px]",
        "spin"
      )}>
        <img
          src={circularIndicator}
          alt="a circular progress indicator"
        />
      </div>
    </div>
  );
}
