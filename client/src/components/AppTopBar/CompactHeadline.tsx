import useScrollPosition from "@react-hook/window-scroll";
import { HTMLAttributes, ReactElement } from "react";

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
}

const normalize = (val: number, min: number, max: number) =>
  (val - min) / (max - min);

const CompactHeadline = ({
  title,
  titleClassName,
  leadingNavigation,
  trailingIcon,
  elevation = true,
  elevationClassName,
  ...args
}: CompactHeadlineProp) => {
  const scrollY = useScrollPosition(240);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-fit z-10 compact-headline">
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
                    "text-on-surface text-lg will-change-auto font-bold",
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
              <div className="p-1 text-on-surface-variant">{trailingIcon}</div>
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
                opacity: normalize(window.scrollY, 90, 100),
              }}
            />
          )}
        </div>
      </div>
      {/* Placeholder Div */}
      <div className="opacity-0" style={{ height: "5.216rem" }} />
    </>
  );
};

export default CompactHeadline;
export type { CompactHeadlineProp };
