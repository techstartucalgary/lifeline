import { HTMLAttributes, ReactElement, ReactNode, useState, useRef, useEffect, useLayoutEffect, ForwardedRef, forwardRef } from "react";
import useScrollPosition from "@react-hook/window-scroll";


import { classnames } from "../../Utilities";

interface AppTopBarProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: boolean;
  children: ReactElement<AllAcceptingChildren> | ReactElement<AllAcceptingChildren>[];
}

type AllAcceptingChildren = typeof LeadingNavigation | typeof TrailingIcon | typeof Title | typeof Subtitle;

const normalize = (val: number, min: number, max: number) => (val - min) / (max - min);

const AppTopBar = ({ elevation = true, className, children, ...args }: AppTopBarProps) => {
  // If children is not an array, make it an array of only itself
  children = Array.isArray(children) ? children : [children];

  // Find elements in children
  const leadingNavigation = children.find((child) => child != undefined && child.type === LeadingNavigation);
  const trailingNavigation = children.find((child) => child != undefined && child.type === TrailingIcon);
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
      <div className="fixed top-0 left-0 right-0 h-fit z-10">
        <div className="relative">
          <div className={classnames("bg-surface", className)} {...args}>
            <div className="flex flex-row px-1 pt-2 pb-1 justify-between" ref={compactTitleRef}>
              {/* Leading Navigation */}
              <div className="flex flex-row items-center justify-center">
                <div className="p-1 text-on-surface min-w-[0.8rem]">
                  {leadingNavigation}
                </div>
                <div
                  className={classnames(
                    "text-on-surface text-lg opacity-0 will-change-auto font-bold",
                    "transition-opacity duration-200 ease-emphasized-decelerate",
                    onScrollOpacity >= 0.2 && "opacity-1",
                  )}
                >
                  {title}
                </div>
              </div>

              {/* Trailing Icon */}
              <div className="p-1 text-on-surface-variant">
                {trailingNavigation}
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
          style={{ opacity: onScrollOpacity }}
        />}
        </div>
      </div>
      

      {/* Headline */}
      <div className={classnames("overflow-hidden", className)} {...args}>
        <div style={{paddingTop: compactTitleHeight}}>
          <Headline title={title} subtitle={subtitle} ref={titleRef} />
        </div>
      </div>
    </>
  );
};

interface HeadlineProp extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactElement<typeof Title>;
  subtitle?: ReactElement<typeof Subtitle>;
}

const Headline = forwardRef<HTMLDivElement, HeadlineProp>(
  (
    { title, subtitle, ...args }: HeadlineProp,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        className={classnames(
          "flex flex-row items-center pb-2 bg-surface",
          "pt-6 md:pt-6",
          "px-6 md:px-4",
        )}
        ref={ref}
        {...args}
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
    );
  });
Headline.displayName = "HeadlineTitle";

const LeadingNavigation = ({ children, ...args }: HTMLAttributes<HTMLDivElement>) => <div {...args}>{children}</div>;
const TrailingIcon = ({ children, className, ...args }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={classnames("flex flex-row space-x-1", className)} {...args}>
      {children}
    </div>
  );
};
const Title = ({ children }: { children: ReactNode; }) => <>{children}</>;
const Subtitle = ({ children }: { children: ReactNode; }) => <>{children}</>;

AppTopBar.LeadingNavigation = LeadingNavigation;
AppTopBar.TrailingNavigation = TrailingIcon;
AppTopBar.Title = Title;
AppTopBar.Subtitle = Subtitle;

export default AppTopBar;
export { LeadingNavigation, TrailingIcon, Title, Subtitle };