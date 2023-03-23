import { ReactNode, HTMLAttributes } from "react";

import { classnames } from "../../Utilities";

import NavItem from "./NavItem";

interface NavigationDrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode | string;
}

const NavigationDrawer = ({
  title,
  children,
  ...args
}: NavigationDrawerProps) => {
  return (
    <div {...args} className={classnames("flex flex-col w-full", args.className)}>
      <p className="m-5 font-medium font-on-surface-variant">{title}</p>
      {children}
    </div>
  );
};

NavigationDrawer.Item = NavItem;

export default NavigationDrawer;
export type { NavigationDrawerProps };
