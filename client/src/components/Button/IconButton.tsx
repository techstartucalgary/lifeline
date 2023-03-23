import { ReactNode } from "react";

import { classnames } from "../../Utilities";

import Button, { ButtonProps } from "./Button";

interface IconButtonProps extends ButtonProps {
  icon: ReactNode | string;
  iconClassName?: string;
}

const IconButton = ({ icon, iconClassName, ...args }: IconButtonProps) => {
  return (
    <Button {...args} className={classnames("px-2 md:px-4 py-3", args.className)}>
      <span className={classnames("material-symbols-outlined text-3xl md:text-2xl m-auto", iconClassName)}>{icon}</span>
    </Button>
  );
};

export default IconButton;
export type { IconButtonProps };