import { ReactNode } from "react";
import { classnames } from "../../Utilities";
import { ButtonProps } from "../Button";

interface NavItemProps extends Omit<ButtonProps, "variant" | "color" | "title"> {
  title?: ReactNode | string;
  icon?: ReactNode | string;
  selected?: boolean;
}

const NavItem = ({ title, icon, selected = false, onClick, ...args }: NavItemProps) => {
  return (
    <button
      {...args}
      className={classnames(
        "flex flex-col justify-center items-center group duration-200",
        args.disabled && "pointer-events-none",
        args.className
      )}
      onClick={onClick}
    >
      <div
        className={classnames(
          "text-on-primary-container flex flex-col px-5.5 py-1 h-9 font-norma relative overflow-hidden",
          "material-symbols-outlined text-xl rounded-full mb-1",

          "before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0",
          "before:group-hover:bg-state-layers-on-surface/8 before:transition-all",
          "disabled:group-hover:before:bg-transparent",

          "transition-all ease-emphasized",
          selected && "bg-primary-container"
        )}
      >
        {icon}
      </div>
      <p
        className={classnames(
          "text-sm align-middle text-center w-full transition-all",
          "ease-emphasized duration-50 truncate",
          selected && "font-medium"
        )}>
        {title}
      </p>
    </button>
  );
};

export default NavItem;
export type { NavItemProps as NavItemProp };