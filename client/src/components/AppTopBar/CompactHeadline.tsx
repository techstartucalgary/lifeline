import { HTMLAttributes, ReactElement, RefObject, useRef } from "react";
import { useScroll, useWindowScroll } from "react-use";

import { classnames } from "../../Utilities";

interface CompactHeadlineProp
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactElement;
  titleClassName?: string | null;
  leadingNavigation?: ReactElement;
  trailingIcon?: ReactElement;
  elevation?: boolean;
  containerRef?: RefObject<HTMLDivElement>;
  compactTitleDisplayRange?: [number, number];
  elevationDisplayRange?: [number, number];
}

const normalize = (val: number, min: number, max: number) =>
  (val - min) / (max - min);

const coalesce = (...args: number[]) => {
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
  containerRef,
  compactTitleDisplayRange = [40, 50],
  elevationDisplayRange = [90, 100],
  ...args
}: CompactHeadlineProp) => {
  const ref = useRef(null);
  const { y: scrollContainerY } = useScroll(containerRef ?? ref);
  const { y: scrollWindowY } = useWindowScroll();
  const scrollY = coalesce(
    scrollContainerY,
    containerRef?.current?.scrollTop || 0,
    scrollWindowY
  );

  return (
    <>
      <div className="h-16 relative">
        <div {...args} className={classnames("bg-surface", args.className)}>
          <div className="flex flex-row px-1 pt-2 pb-1 justify-between items-center">
            {/* Leading Navigation */}
            <div className="flex flex-row items-center">
              <div className="py-0.5 text-on-surface min-w-[0.8rem]">
                {leadingNavigation}
              </div>
              <div
                className={classnames(
                  "text-on-surface text-base will-change-auto font-medium",
                  "transition-opacity duration-200 md:duration-75",
                  titleClassName
                )}
                style={{
                  opacity: normalize(
                    scrollY,
                    compactTitleDisplayRange[0],
                    compactTitleDisplayRange[1]
                  ),
                }}
              >
                {title}
              </div>
            </div>

            {/* Trailing Icon */}
            <div
              className={classnames(
                "px-1 py-0.5 text-on-surface-variant",
                "flex flex-row space-x-1"
              )}
            >
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
              "will-change-opacity"
            )}
            style={{
              opacity: normalize(
                scrollY,
                elevationDisplayRange[0],
                elevationDisplayRange[1]
              ),
            }}
          />
        )}
      </div>
    </>
  );
};

export default CompactHeadline;
export type { CompactHeadlineProp };
