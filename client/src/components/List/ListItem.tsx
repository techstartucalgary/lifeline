import { ReactNode } from "react";

import { classnames } from "../../Utilities";
import { Button, ButtonProps } from "../Button";

interface ListItemProps extends Omit<ButtonProps, "icon"> {
  leadingIcon?: ReactNode | string;
  trailingIcon?: ReactNode | string;
  supportingText?: ReactNode | string;
  metadata?: ReactNode | string;
}

const ListItem = ({
  title,
  supportingText,
  metadata,
  leadingIcon,
  trailingIcon,
  color = "primary",
  className,
  ...args
}: ListItemProps) => {
  return (
    <Button
      {...args}
      color={color}
      variant="text"
      className={classnames(
        "px-4 py-2 text-on-surface-variant rounded-none font-normal h-[4.5rem]",
        className
      )}
      icon={
        <span
          className={classnames(
            "material-symbols-outlined h-6 w-6 !text-xl",
            "flex justify-center items-center"
          )}
        >
          {leadingIcon}
        </span>
      }
    >
      <div className="ml-1 truncate text-left">
        <p
          className={classnames(
            "font-medium text-base leading-6 text-on-surface truncate",
            args.disabled && "text-sys-on-surface/[.38]"
          )}
        >
          {title}
        </p>
        <p className="leading-5 truncate">{supportingText}</p>
      </div>
      <div className="ml-auto flex items-center justify-center text-base proportional-nums">
        <div className="font-normal">{metadata}</div>
        <span
          className={classnames(
            "material-symbols-outlined",
            "flex justify-center items-center ml-1"
          )}
        >
          {trailingIcon}
        </span>
      </div>
    </Button>
  );
};

export default ListItem;
export type { ListItemProps };
