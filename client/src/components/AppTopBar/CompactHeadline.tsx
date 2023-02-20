import { ForwardedRef, HTMLAttributes, ReactElement, forwardRef } from "react";

import { classnames } from "../../Utilities";

import { LeadingNavigationProp, TitleProp, TrailingIconProp } from "./Subcomponents";

interface CompactHeadlineProp extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactElement<TitleProp>;
  titleClassName?: string | null;
  leadingNavigation?: ReactElement<LeadingNavigationProp>;
  trailingIcon?: ReactElement<TrailingIconProp>;
  elevation?: boolean;
  elevationOpacity?: number;
}

const CompactHeadline = forwardRef<HTMLDivElement, CompactHeadlineProp>(
  (
    { title, titleClassName, leadingNavigation, trailingIcon, elevation = true, elevationOpacity, ...args }: CompactHeadlineProp,
    ref: ForwardedRef<HTMLDivElement>
  ) => { 
    return (
      <div className="fixed top-0 left-0 right-0 h-fit z-10" ref={ref}>
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
                    "text-on-surface text-lg opacity-0 will-change-auto font-bold",
                    "transition-opacity duration-200 ease-emphasized-decelerate",
                    titleClassName,
                  )}
                >
                  {title}
                </div>
              </div>

              {/* Trailing Icon */}
              <div className="p-1 text-on-surface-variant">
                {trailingIcon}
              </div>
            </div>
          </div>
        
          {elevation &&
            <div
              className={classnames(
                "opacity-0 bg-primary/8 absolute -top-full left-0 right-0 bottom-0", 
                "transition-all pointer-events-none z-0",
                "md:ease-emphasized ease-emphasized-decelerate",
                "duration-1000 md:duration-200",
                "will-change-opacity"
              )}
              style={{ opacity: elevationOpacity }}
            />
          }
        </div>
      </div>
    );
  });
CompactHeadline.displayName = "CompactHeadline";

export default CompactHeadline;