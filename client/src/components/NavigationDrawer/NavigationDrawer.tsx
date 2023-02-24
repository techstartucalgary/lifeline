import { ReactNode, HTMLAttributes } from "react";
import NavItem from "./NavItem";
import { classnames } from "../../Utilities";

interface NavigationDrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode | string;
}

const NavigationDrawer = ({
  title,
  children,
  ...args
}: NavigationDrawerProps) => {
  return (
    <div {...args} className={classnames("flex flex-col w-full space-y-0.5", args.className)}>
      <p className="m-5 ml-5.5 font-bold">{title}</p>
      {children}
    </div>
  );
};

NavigationDrawer.Item = NavItem;

export default NavigationDrawer;
export type { NavigationDrawerProps };
