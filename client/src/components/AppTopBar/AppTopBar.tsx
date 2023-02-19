import { HTMLAttributes, ReactElement, ReactNode, useState } from "react";
import useScrollPosition from "@react-hook/window-scroll";


import { classnames } from "../../Utilities";

interface AppTopBarProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: boolean;
  children: ReactElement<AllAcceptingChildren> | ReactElement<AllAcceptingChildren>[];
}

type AllAcceptingChildren = typeof LeadingNavigation | typeof TrailingIcon | typeof Title | typeof Subtitle;

const normalize = (val: number, max: number, min: number) => (val - min) / (max - min);

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
  const [shrinked, setShrinked] = useState(false);

  return (
    <div className={classnames("bg-surface", className )} {...args}>
      {elevation &&
        <div
          className={classnames(
            "opacity-0 bg-primary/8 absolute -top-full left-0 right-0 bottom-0", 
            "transition-all pointer-events-none z-0",
            "md:ease-emphasized ease-emphasized-decelerate",
            "duration-1000 md:duration-200"
          )}
          style={{ opacity: (scrollY * 2) / 100 }}
        />}
      <div className="flex flex-row px-1 pt-2 justify-between">
        {/* Leading Navigation */}
        <div className="flex flex-row items-center justify-center">
          <div className="p-1 text-on-surface min-w-[0.8rem]">
            {leadingNavigation}
          </div>
          <div className={classnames("text-on-surface text-lg opacity-0", shrinked && "opacity-1")}>
            {title}
          </div>
        </div>

        {/* Trailing Icon */}
        <div className="p-1 text-on-surface-variant">
          {trailingNavigation}
        </div>
      </div>

      {/* Headline */}
      <div className="overflow-hidden pb-1">
        <div
          className={classnames(
            "flex flex-row items-center pb-2",
            "pt-6 md:pt-6",
            "px-6 md:px-4"
          )}
          style={{
            marginTop: -scrollY
          }}
        >
          <div className="grow space-y-1">
            <h1 className={classnames("text-on-surface font-headline font-bold", "text-2xl md:text-3xl")}>
              {title}
            </h1>
            <h2 className={classnames("text-outline font-medium", "text-md md:text-lg")}>
              {subtitle}
            </h2>
          </div>

          {/* <div>
          <IconButton className="hidden md:inline text-on-surface-variant" icon="error" />
          <IconButton className="hidden md:inline text-on-surface-variant" icon="delete" />
        </div> */}
        </div>
      </div>
    </div>
  );
};

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