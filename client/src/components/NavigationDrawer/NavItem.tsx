import { ReactNode } from "react";

import { classnames } from "../../Utilities";
import { Button, ButtonProps } from "../Button";

interface NavItemProps extends Omit<ButtonProps, "variant" | "color"> {
  metadata?: ReactNode | string;
  selected?: boolean;
}

const NavItem = ({ title, metadata, className, icon, selected, ...args }: NavItemProps) => {
  return (
    <Button
      {...args}
      color="secondary"
      variant="text"
      className={classnames(
        "flex flex-row p-4 text-on-secondary-container",
        "hover:text-on-surface-variant",
        selected && "bg-secondary-container hover:before:bg-transparent",
        className
      )}
      icon={
        <span className={classnames(
          "material-symbols-outlined scale-75",
          "flex justify-center items-center",
        )}>{icon}</span>
      }
    >
      <div className="flex flex-col min-w-0">
        <p className="font-medium align-middle truncate">
          {title}
        </p>
      </div>
      <p className="ml-auto mr-1 flex items-center justify-center text-sm proportional-nums">
        {metadata}
      </p>
    </Button>
  );
};

export default NavItem;
export type { NavItemProps as NavItemProp };