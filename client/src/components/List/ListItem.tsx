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
      className={classnames("px-5.5 py-4.5 text-on-surface-variant", className)}
      icon={
        <span
          className={classnames(
            "material-symbols-outlined text-3xl",
            "flex justify-center items-center"
          )}
        >
          {leadingIcon}
        </span>
      }
    >
      <div className="ml-2 truncate text-left">
        <p
          className={classnames(
            "font-medium text-lg leading-6 text-on-surface truncate",
            args.disabled && "text-sys-on-surface/[.38]"
          )}
        >
          {title}
        </p>
        <p className="font-normal truncate">{supportingText}</p>
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
