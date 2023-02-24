import { HTMLAttributes } from "react";
import { classnames } from "../../Utilities";

import NavItem from "./NavItem";

type NavigationDrawerProps = Omit<HTMLAttributes<HTMLDivElement>, "title">

const NavigationRail = ({
  children,
  ...args
}: NavigationDrawerProps) => {
  return (
    <div {...args} className={classnames("flex flex-col w-full space-y-4 px-1.5 py-6", args.className)}>
      {children}
    </div>
  );
};

NavigationRail.Item = NavItem;

export default NavigationRail;
export type { NavigationDrawerProps };
