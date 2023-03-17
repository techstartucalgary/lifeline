import { ForwardedRef, HTMLAttributes, ReactElement, forwardRef } from "react";
import { useEffectOnce, useUpdate } from "react-use";

import { classnames } from "../../Utilities";

import { SubtitleProp, TitleProp } from "./Subcomponents";

interface HeadlineProp extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactElement<TitleProp>;
  titleClassName?: string | null;
  subtitle?: ReactElement<SubtitleProp>;
  subtitleClassName?: string | null;
}

const normalize = (val: number, min: number, max: number) =>
  (val - min) / (max - min);

const limit = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

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
    const update = useUpdate();

    useEffectOnce(() => {
      const render = () => {
        update();
      };
      window.addEventListener("scroll", render);
      return () => {
        window.removeEventListener("scroll", render);
      };
    });

    console.log(Math.abs(normalize(window.scrollY, 0, 100)));

    return (
      <div
        {...args}
        className={classnames("overflow-hidden", args.className)}
        ref={ref}
      >
        <div
          className={classnames(
            "flex flex-row items-center pb-2 bg-surface",
            "px-4.5 md:px-4"
          )}
        >
          <div className="grow space-y-1">
            <h1
              className={classnames(
                "text-on-surface font-headline font-bold",
                "text-3xl md:text-4xl",
                "transition-all duration-200 ease-emphasized origin-bottom-left will-change-transform",
                titleClassName
              )}
              style={{
                transform: `scale(${limit(
                  1 + normalize(window.scrollY, 0, -window.innerHeight * 5),
                  1,
                  1.05
                )})`,
              }}
            >
              {title}
            </h1>
            <h2
              className={classnames(
                "text-outline font-medium",
                "text-lg md:text-xl",
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
