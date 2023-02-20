import { ForwardedRef, HTMLAttributes, ReactElement, forwardRef } from "react";

import { classnames } from "../../Utilities";
import { SubtitleProp, TitleProp } from "./Subcomponents";


interface HeadlineProp extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactElement<TitleProp>;
  subtitle?: ReactElement<SubtitleProp>;
}

const Headline = forwardRef<HTMLDivElement, HeadlineProp>(
  (
    { title, subtitle, ...args }: HeadlineProp,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div {...args} className={classnames("overflow-hidden", args.className)} ref={ref}>
        <div
          className={classnames(
            "flex flex-row items-center pb-2 bg-surface",
            "pt-6 md:pt-6",
            "px-6 md:px-4",
          )}
        >
          <div className="grow space-y-1">
            <h1 className={classnames("text-on-surface font-headline font-bold", "text-2xl md:text-3xl")}>
              {title}
            </h1>
            <h2 className={classnames("text-outline font-medium", "text-md md:text-lg")}>
              {subtitle}
            </h2>
          </div>
        </div>
      </div>
    );
  });
Headline.displayName = "Headline";

export default Headline;