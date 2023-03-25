import { HTMLAttributes, ReactElement, RefObject, useRef } from "react";
import { useScroll, useWindowScroll } from "react-use";

import { classnames } from "../../Utilities";

import { SubtitleProp, TitleProp } from "./Subcomponents";

const normalize = (val: number, min: number, max: number) =>
  (val - min) / (max - min);

const limit = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

const findFirstNonZero = (...args: number[]) => {
  for (const arg of args) {
    if (arg !== 0) return arg;
  }
  return 0;
};

const ReactiveTitle = ({
  title,
  titleClassName,
  containerRef,
}: HeadlineProp) => {
  const ref = useRef(null);
  const { y: scrollContainerY } = useScroll(containerRef ?? ref);
  const { y: scrollWindowY } = useWindowScroll();
  const scrollY = findFirstNonZero(scrollContainerY, scrollWindowY);

  return (
    <h1
      className={classnames(
        "text-on-surface font-headline font-bold text-[1.75rem] leading-9",
        "transition-all duration-100 ease-out origin-bottom-left will-change-transform",
        titleClassName
      )}
      style={{
        transform: `scale(${limit(
          1 + normalize(scrollY, 0, -window.innerHeight * 4),
          1,
          1.04
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
  containerRef?: RefObject<HTMLDivElement>;
}

const Headline = ({
  title,
  titleClassName,
  subtitle,
  subtitleClassName,
  containerRef,
  ...args
}: HeadlineProp) => {
  return (
    <div {...args} className={classnames("overflow-hidden", args.className)}>
      <div className="flex flex-row items-center pb-5 space-y-1 bg-surface">
        <div className="grow px-4">
          <ReactiveTitle
            title={title}
            titleClassName={titleClassName}
            containerRef={containerRef}
          />
          <h2
            className={classnames(
              "text-outline font-medium text-base",
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
};
Headline.displayName = "Headline";

export default Headline;
export type { HeadlineProp };
