import useScrollPosition from "@react-hook/window-scroll";
import { ForwardedRef, HTMLAttributes, ReactElement, forwardRef } from "react";

import { classnames } from "../../Utilities";

import { SubtitleProp, TitleProp } from "./Subcomponents";

const normalize = (val: number, min: number, max: number) =>
  (val - min) / (max - min);

const limit = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const ReactiveTitle = ({ title, titleClassName }: HeadlineProp) => {
  const scrollY = useScrollPosition(20);

  return (
    <h1
      className={classnames(
        "text-on-surface font-headline font-bold text-[1.75rem] leading-9",
        "transition-all duration-200 ease-emphasized origin-bottom-left will-change-transform",
        titleClassName
      )}
      style={{
        transform: `scale(${limit(
          1 + normalize(scrollY, 0, -window.innerHeight * 4),
          1,
          1.1
        )})`,
      }}
    >
      {title}
    </h1>
  );
};

interface HeadlineProp extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactElement<TitleProp>;
  titleClassName?: string | null;
  subtitle?: ReactElement<SubtitleProp>;
  subtitleClassName?: string | null;
}

const Headline = forwardRef<HTMLDivElement, HeadlineProp>(
  (
    {
      title,
      titleClassName,
      subtitle,
      subtitleClassName,
      ...args
    }: HeadlineProp,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        {...args}
        className={classnames("overflow-hidden", args.className)}
        ref={ref}
      >
        <div className="flex flex-row items-center pb-5 space-y-1 bg-surface">
          <div className="grow px-4">
            <ReactiveTitle title={title} titleClassName={titleClassName} />
            <h2
              className={classnames(
                "text-outline font-medium text-lg",
                "transition-opacity duration-100 ease-emphasized-accelerate",
                subtitleClassName
              )}
            >
              {subtitle}
            </h2>
          </div>
        </div>
      </div>
    );
  }
);
Headline.displayName = "Headline";

export default Headline;
export type { HeadlineProp };
