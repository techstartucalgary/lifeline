import { ReactNode } from "react";
import Button, { ButtonProps } from "./Button";
import { classnames } from "../../Utilities";

interface IconButtonProps extends ButtonProps {
  icon: ReactNode | string;
  iconClassName?: string;
}

const IconButton = ({ icon, iconClassName, ...args }: IconButtonProps) => {
  return (
    <Button {...args}>
      <span className={classnames("material-symbols-outlined text-3xl md:text-2.5xl m-auto", iconClassName)}>{icon}</span>
    </Button>
  );
};

export default IconButton;
export type { IconButtonProps };