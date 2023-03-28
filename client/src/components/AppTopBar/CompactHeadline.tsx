import { HTMLAttributes, ReactElement, RefObject, useRef } from "react";
import { useScroll, useWindowScroll } from "react-use";

import { classnames } from "../../Utilities";

import {
  LeadingNavigationProp,
  TitleProp,
  TrailingIconProp,
} from "./Subcomponents";

interface CompactHeadlineProp
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactElement<TitleProp>;
  titleClassName?: string | null;
  leadingNavigation?: ReactElement<LeadingNavigationProp>;
  trailingIcon?: ReactElement<TrailingIconProp>;
  elevation?: boolean;
  elevationClassName?: string | null;
  containerRef?: RefObject<HTMLDivElement>;
}

const normalize = (val: number, min: number, max: number) =>
  (val - min) / (max - min);

const findFirstNonZero = (...args: number[]) => {
  for (const arg of args) {
    if (arg !== 0) return arg;
  }
  return 0;
};

const CompactHeadline = ({
  title,
  titleClassName,
  leadingNavigation,
  trailingIcon,
  elevation = true,
  elevationClassName,
  containerRef,
  ...args
}: CompactHeadlineProp) => {
  const ref = useRef(null);
  const { y: scrollContainerY } = useScroll(containerRef ?? ref);
  const { y: scrollWindowY } = useWindowScroll();
  const scrollY = findFirstNonZero(scrollContainerY, scrollWindowY);

  return (
    <>
      <div className="h-16 max-h-16">
        <div className="relative">
          <div {...args} className={classnames("bg-surface", args.className)}>
            <div className="flex flex-row px-1 pt-2 pb-1 justify-between">
              {/* Leading Navigation */}
              <div className="flex flex-row items-center justify-center">
                <div className="p-1 text-on-surface min-w-[0.8rem]">
                  {leadingNavigation}
                </div>
                <div
                  className={classnames(
                    "text-on-surface text-base will-change-auto font-medium",
                    "transition-opacity duration-200 md:duration-75",
                    titleClassName
                  )}
                  style={{
                    opacity: normalize(scrollY, 40, 50),
                  }}
                >
                  {title}
                </div>
              </div>

              {/* Trailing Icon */}
              <div className="px-1 py-0.5 text-on-surface-variant">
                {trailingIcon}
              </div>
            </div>
          </div>

          {elevation && (
            <div
              className={classnames(
                "bg-primary/8 absolute -top-full left-0 right-0 bottom-0",
                "pointer-events-none z-0",
                "transition-opacity duration-200 md:duration-75",
                "will-change-opacity",
                elevationClassName
              )}
              style={{
                opacity: normalize(scrollY, 90, 100),
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CompactHeadline;
export type { CompactHeadlineProp };
