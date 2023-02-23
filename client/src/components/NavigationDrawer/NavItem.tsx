import { ReactNode } from "react";
import { classnames } from "../../Utilities";
import { Button, ButtonProps } from "../Button";

interface NavItemProps extends ButtonProps {
  metadata?: ReactNode | string;
}

const NavItem = ({ title, metadata, className, icon, color = "primary", variant = "text", ...args }: NavItemProps) => {
  return (
    <Button
      {...args}
      color={color}
      variant={variant}
      className={classnames(
        variant === "text" && "text-on-surface-variant",
        "flex flex-row px-5.5 py-4.5",
        className
      )}
      icon={
        <span className={classnames(
          "material-symbols-outlined variant-navigation-drawer text-xl",
          "flex justify-center items-center",
        )}>{icon}</span>
      }
    >
      <div className="flex flex-col ml-2 min-w-0">
        <p className="font-medium text-base align-middle leading-7">
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