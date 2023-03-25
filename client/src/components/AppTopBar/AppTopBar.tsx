import { HTMLAttributes, ReactElement, RefObject } from "react";

import { classnames } from "../../Utilities";

import CompactHeadline from "./CompactHeadline";
import Headline from "./Headline";
import {
  IconButton,
  IconButtonProps,
  LeadingNavigation,
  LeadingNavigationProp,
  Subtitle,
  SubtitleProp,
  Title,
  TitleProp,
  TrailingIcon,
  TrailingIconProp,
} from "./Subcomponents";

interface AppTopBarProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: boolean;
  children:
    | ReactElement<AllAcceptingChildren>
    | ReactElement<AllAcceptingChildren>[];
  variant?: "small" | "medium" | "large";
  containerRef: RefObject<HTMLDivElement>;
}

type AllAcceptingChildren =
  | LeadingNavigationProp
  | TrailingIconProp
  | TitleProp
  | SubtitleProp;

const AppTopBar = ({
  variant = "large",
  elevation,
  children,
  containerRef,
  ...args
}: AppTopBarProps) => {
  // If children is not an array, make it an array of only itself
  children = Array.isArray(children) ? children : [children];

  // Find elements in children
  const leadingNavigation = children.find(
    (child) => child !== undefined && child.type === LeadingNavigation
  );
  const trailingIcon = children.find(
    (child) => child !== undefined && child.type === TrailingIcon
  );
  const title = children.find(
    (child) => child !== undefined && child.type === Title
  );
  const subtitle = children.find(
    (child) => child !== undefined && child.type === Subtitle
  );

  return (
    <>
      <CompactHeadline
        {...args}
        title={title}
        titleClassName={classnames(variant === "small" && "!opacity-100")}
        leadingNavigation={leadingNavigation}
        trailingIcon={trailingIcon}
        elevation={elevation}
        containerRef={containerRef}
      />
      <Headline
        {...args}
        className={classnames(
          variant === "small" && "h-0",
          variant === "large" && "pt-6",
          args.className
        )}
        title={title}
        subtitle={subtitle}
        containerRef={containerRef}
      />
    </>
  );
};

AppTopBar.LeadingNavigation = LeadingNavigation;
AppTopBar.TrailingIcon = TrailingIcon;
AppTopBar.Title = Title;
AppTopBar.Subtitle = Subtitle;
AppTopBar.IconButton = IconButton;

export default AppTopBar;
export { IconButton, LeadingNavigation, Subtitle, Title, TrailingIcon };
export type {
  AppTopBarProps,
  IconButtonProps,
  LeadingNavigationProp,
  SubtitleProp,
  TitleProp,
  TrailingIconProp,
};
