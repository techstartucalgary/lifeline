import { HTMLAttributes, ReactElement, useState, useRef, useEffect, useLayoutEffect } from "react";
import useScrollPosition from "@react-hook/window-scroll";

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


AppTopBar.LeadingNavigation = LeadingNavigation;
AppTopBar.TrailingNavigation = TrailingIcon;
AppTopBar.Title = Title;
AppTopBar.Subtitle = Subtitle;

export default AppTopBar;
export type { AppTopBarProps };
export { LeadingNavigation, TrailingIcon, Title, Subtitle };
export type { LeadingNavigationProp, TrailingIconProp, TitleProp, SubtitleProp };