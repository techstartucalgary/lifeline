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
        "flex flex-row px-5.5 py-4.5 text-on-secondary-container",
        selected && "bg-secondary-container",
        className
      )}
      icon={
        <span className={classnames(
          "material-symbols-outlined variant-navigation-drawer scale-75",
          "flex justify-center items-center",
        )}>{icon}</span>
      }
    >
      <div className="flex flex-col min-w-0">
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