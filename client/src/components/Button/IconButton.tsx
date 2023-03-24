import { ReactNode } from "react";

import { classnames } from "../../Utilities";

import Button, { ButtonProps } from "./Button";

interface IconButtonProps extends ButtonProps {
  icon: ReactNode | string;
  iconClassName?: string;
}

const IconButton = ({ icon, iconClassName, ...args }: IconButtonProps) => {
  return (
    <Button
      {...args}
      className={classnames("h-10 w-10", args.className)}
    >
      <span className={classnames("material-symbols-outlined", iconClassName)}>
        {icon}
      </span>
    </Button>
  );
};

export default IconButton;
export type { IconButtonProps };
