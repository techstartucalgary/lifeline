import { HTMLAttributes, ReactNode } from "react";

import { classnames } from "../../Utilities";
import {
  IconButton as RawIconButton,
  IconButtonProps as RawIconButtonProps,
} from "../Button";

type LeadingNavigationProp = HTMLAttributes<HTMLDivElement>;
const LeadingNavigation = ({ children, ...args }: LeadingNavigationProp) => (
  <div {...args}>{children}</div>
);

type TrailingIconProp = HTMLAttributes<HTMLDivElement>;
const TrailingIcon = ({ children, className, ...args }: TrailingIconProp) => {
  return (
    <div className={classnames("flex flex-row space-x-1", className)} {...args}>
      {children}
    </div>
  );
};

type IconButtonProps = RawIconButtonProps;
const IconButton = ({ children, ...args }: IconButtonProps) => (
  <RawIconButton
    {...args}
    className={classnames("p-0 md:p-0 w-10 md:w-12 h-12 text-2.5xl justify-center items-center", args.className)}
  >
    {children}
  </RawIconButton>
);

interface TitleProp {
  children?: ReactNode;
}
const Title = ({ children }: TitleProp) => <>{children}</>;

interface SubtitleProp {
  children?: ReactNode;
}
const Subtitle = ({ children }: SubtitleProp) => <>{children}</>;

export { IconButton, LeadingNavigation, Subtitle, Title, TrailingIcon };
export type {
  IconButtonProps,
  LeadingNavigationProp,
  SubtitleProp,
  TitleProp,
  TrailingIconProp,
};
