import { ReactNode, HTMLAttributes } from "react";
import NavItem from "./NavItem";

interface NavigationDrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode | string;
}

const NavigationDrawer = ({
  title,
  children,
}: NavigationDrawerProps) => {
  return (
    <div className="flex flex-col w-full space-y-0.5">
      <p className="m-5 ml-5.5 font-bold">{title}</p>
      {children}
    </div>
  );
};

NavigationDrawer.Item = NavItem;

export default NavigationDrawer;
export type { NavigationDrawerProps };
