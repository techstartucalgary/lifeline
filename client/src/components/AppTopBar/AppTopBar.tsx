import useScrollPosition from "@react-hook/window-scroll";
import { HTMLAttributes, ReactElement, useState, useRef, useLayoutEffect } from "react";

import { classnames } from "../../Utilities";

import CompactHeadline from "./CompactHeadline";
import Headline from "./Headline";
import {
  LeadingNavigation,
  LeadingNavigationProp,
  TrailingIcon,
  TrailingIconProp,
  Title,
  TitleProp,
  Subtitle,
  SubtitleProp
} from "./Subcomponents";

interface AppTopBarProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: boolean;
  children: ReactElement<AllAcceptingChildren> | ReactElement<AllAcceptingChildren>[];
  variant?: "small" | "medium" | "large";
}

type AllAcceptingChildren = LeadingNavigationProp | TrailingIconProp | TitleProp | SubtitleProp;

const AppTopBar = ({ variant = "large", elevation, children, ...args }: AppTopBarProps) => {
  // If children is not an array, make it an array of only itself
  children = Array.isArray(children) ? children : [children];

  // Find elements in children
  const leadingNavigation = children.find((child) => child !== undefined && child.type === LeadingNavigation);
  const trailingIcon = children.find((child) => child !== undefined && child.type === TrailingIcon);
  const title = children.find((child) => child !== undefined && child.type === Title);
  const subtitle = children.find((child) => child !== undefined && child.type === Subtitle);

  // For scrolling
  const scrollY = useScrollPosition(240);

  // For compact title height
  const compactHeadlineRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [compactHeadlineHeight, setCompactHeadlineHeight] = useState(0);
  const [headlineHeight, setHeadlineHeight] = useState(0);
  useLayoutEffect(() => {
    const chh = compactHeadlineRef.current?.offsetHeight || 0;
    const hh = headlineRef.current?.offsetHeight || 0;

    const onTopbarHeight = () => {
      if (compactHeadlineRef.current) {
        setCompactHeadlineHeight(chh);
        setHeadlineHeight(hh);
      }
    };

    onTopbarHeight();
    window.addEventListener("resize", onTopbarHeight);
    return () => window.removeEventListener("resize", onTopbarHeight);
  }, []);

  return (
    <>
      <CompactHeadline
        {...args}
        title={title}
        titleClassName={classnames("opacity-0", (scrollY > compactHeadlineHeight * 0.75 || variant === "small") && "opacity-1")}
        leadingNavigation={leadingNavigation}
        trailingIcon={trailingIcon}
        elevation={elevation}
        elevationClassName={classnames("opacity-0", (scrollY > headlineHeight) && "opacity-1")}
        ref={compactHeadlineRef}
      />
      <Headline
        {...args}
        style={{ marginTop: compactHeadlineHeight, ...args.style }}
        className={classnames(variant === "small" && "h-0", variant === "large" && "pt-6", args.className)}
        title={title}
        subtitle={subtitle}
        titleClassName={classnames("opacity-1", (scrollY > compactHeadlineHeight * 0.75) && "opacity-0")}
        subtitleClassName={classnames("opacity-1", (scrollY > compactHeadlineHeight * 0.75) && "opacity-0")}
        ref={headlineRef}
      />
    </>
  );
};


AppTopBar.LeadingNavigation = LeadingNavigation;
AppTopBar.TrailingIcon = TrailingIcon;
AppTopBar.Title = Title;
AppTopBar.Subtitle = Subtitle;

export default AppTopBar;
export type { AppTopBarProps };
export { LeadingNavigation, TrailingIcon, Title, Subtitle };
export type { LeadingNavigationProp, TrailingIconProp, TitleProp, SubtitleProp };
