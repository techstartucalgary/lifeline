import { HTMLAttributes, ReactElement, ReactNode } from "react";

import { classnames } from "../../Utilities";

interface AppTopBarProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: "flat" | "on-scroll";
  children: ReactElement<AllAcceptingChildren> | ReactElement<AllAcceptingChildren>[];
}

type AllAcceptingChildren = typeof LeadingNavigation | typeof TrailingIcon | typeof Title | typeof Subtitle;

const AppTopBar = ({ elevation = "flat", className, children, ...args }: AppTopBarProps) => {
  // If children is not an array, make it an array of only itself
  children = Array.isArray(children) ? children : [children];

  // Find elements in children
  const leadingNavigation = children.find((child) => child != undefined && child.type === LeadingNavigation);
  const trailingNavigation = children.find((child) => child != undefined && child.type === TrailingIcon);
  const title = children.find((child) => child != undefined && child.type === Title);
  const subtitle = children.find((child) => child != undefined && child.type === Subtitle);

  return (
    <div
      className={classnames(
        "bg-surface",
        "before:opacity-0 before:bg-primary/8 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0",
        "transition-all before:transition-all before:ease-standard before:pointer-events-none",
        (elevation === "on-scroll") && "before:opacity-100",
        className
      )}
      {...args}
    >
      <div className="flex flex-row px-1 pt-2 justify-between">
        {/* Leading Navigation */}
        <div className="flex flex-row items-center justify-center">
          <div className="p-1 text-on-surface min-w-[0.8rem]">
            {leadingNavigation}
          </div>
          <div className={"text-on-surface font-headline font-bold text-xl"}>
            {title}
          </div>
        </div>

        {/* Trailing Icon */}
        <div className="p-1 text-on-surface-variant">
          {trailingNavigation}
        </div>
      </div>

      {/* Headline */}
      <div className={classnames("flex flex-row items-center pt-10 px-4", "pb-5 md:pb-5")}>
        <div className="grow space-y-1">
          <h1 className={classnames("text-on-surface font-headline font-bold", "text-3xl md:text-3xl")}>
            {title}
          </h1>
          <h2 className={classnames("text-outline font-medium", "text-xl md:text-lg")}>
            {subtitle}
          </h2>
        </div>

        {/* <div>
          <IconButton className="hidden md:inline text-on-surface-variant" icon="error" />
          <IconButton className="hidden md:inline text-on-surface-variant" icon="delete" />
        </div> */}
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