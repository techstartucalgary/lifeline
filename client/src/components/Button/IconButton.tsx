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
      className={classnames(
        "p-0 md:p-0 w-10 h-10 text-xl justify-center items-center",
        args.className
      )}
    >
      <span className={classnames("material-symbols-outlined", iconClassName)}>
        {icon}
      </span>
    </Button>
  );
};

export default IconButton;
export type { IconButtonProps };
