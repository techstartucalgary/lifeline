import React from "react";
import Button, { ButtonProps } from "./Button";
import { classnames } from "../../Utilities";

interface IconButtonProps extends ButtonProps {
  icon: string;
  iconClassName?: string;
}

const IconButton = ({ icon, iconClassName, ...args }: IconButtonProps) => {
  return (
    <Button {...args}>
      <span className={classnames("material-symbols-outlined", iconClassName)}>{icon}</span>
    </Button>
  );
};

export default IconButton;
export type { IconButtonProps };