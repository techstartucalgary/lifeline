import { HTMLAttributes, ReactNode } from "react";

import { classnames } from "../../Utilities";

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

export { LeadingNavigation, TrailingIcon, Title, Subtitle };
export type { LeadingNavigationProp, TrailingIconProp, TitleProp, SubtitleProp };