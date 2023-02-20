import { HTMLAttributes, ReactElement, ReactNode, useState, useRef, useEffect, useLayoutEffect, ForwardedRef, forwardRef } from "react";
import useScrollPosition from "@react-hook/window-scroll";

import { classnames } from "../../Utilities";

interface AppTopBarProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: boolean;
  children: ReactElement<AllAcceptingChildren> | ReactElement<AllAcceptingChildren>[];
}

type AllAcceptingChildren = LeadingNavigationProp | TrailingIconProp | TitleProp | SubtitleProp;

const normalize = (val: number, min: number, max: number) => (val - min) / (max - min);

const AppTopBar = ({ elevation, children, ...args }: AppTopBarProps) => {
  // If children is not an array, make it an array of only itself
  children = Array.isArray(children) ? children : [children];

  // Find elements in children
  const leadingNavigation = children.find((child) => child != undefined && child.type === LeadingNavigation);
  const trailingIcon = children.find((child) => child != undefined && child.type === TrailingIcon);
  const title = children.find((child) => child != undefined && child.type === Title);
  const subtitle = children.find((child) => child != undefined && child.type === Subtitle);

  // For scrolling
  const scrollY = useScrollPosition(240);

  // Shrink state
  const [onScrollOpacity, setOnScrollOpacity] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const compactTitleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const min = (compactTitleRef.current?.clientHeight || 0);
    const max = (titleRef.current?.clientHeight || 0);
    const onScrollOpacity = normalize(
      Math.min(Math.max(scrollY, min), max),
      min, max
    );
    console.log(scrollY, min, max);
    setOnScrollOpacity(onScrollOpacity);
  }, [scrollY]);
  
  // For compact title height
  const [compactTitleHeight, setCompactTitleHeight] = useState(0);
  useLayoutEffect(() => {
    const onTopbarHeight = () => {
      if (compactTitleRef.current) {
        setCompactTitleHeight(compactTitleRef.current.offsetHeight);
      }
    };
    onTopbarHeight();
    window.addEventListener("resize", onTopbarHeight);
    return () => window.removeEventListener("resize", onTopbarHeight);
  }, [compactTitleRef.current]);

  return (
    <>
      <CompactHeadline
        {...args}
        title={title}
        titleClassName={onScrollOpacity >= 0.2 ? "opacity-1" : null}
        leadingNavigation={leadingNavigation}
        trailingIcon={trailingIcon}
        elevation={elevation}
        elevationOpacity={onScrollOpacity}
        ref={compactTitleRef}
      />
      <Headline
        {...args}
        style={{ paddingTop: compactTitleHeight, ...args.style }}
        title={title}
        subtitle={subtitle}
        ref={titleRef}
      />
    </>
  );
};

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

type LeadingNavigationProp = HTMLAttributes<HTMLDivElement>;
const LeadingNavigation = ({ children, ...args }: LeadingNavigationProp) => <div {...args}>{children}</div>;

type TrailingIconProp = HTMLAttributes<HTMLDivElement>;
const TrailingIcon = ({ children, className, ...args }: TrailingIconProp) => {
  return (
    <div className={classnames("flex flex-row space-x-1", className)} {...args}>
      {children}
    </div>
  );
};

interface TitleProp {
  children?: ReactNode;
} 
const Title = ({ children }: TitleProp) => <>{children}</>;

interface SubtitleProp {
  children?: ReactNode;
}
const Subtitle = ({ children }: SubtitleProp) => <>{children}</>;

AppTopBar.LeadingNavigation = LeadingNavigation;
AppTopBar.TrailingNavigation = TrailingIcon;
AppTopBar.Title = Title;
AppTopBar.Subtitle = Subtitle;

export default AppTopBar;
export { LeadingNavigation, TrailingIcon, Title, Subtitle };