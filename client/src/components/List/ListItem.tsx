import { ReactNode } from "react";
import { Button, ButtonProps } from "../Button";
import { classnames } from "../../Utilities";

interface ListItemProps extends Omit<ButtonProps, "icon"> {
  leadingIcon?: ReactNode | string;
  trailingIcon?: ReactNode | string;
  supportingText?: ReactNode | string;
  metadata?: ReactNode | string;
}

const ListItem = ({ title, supportingText, metadata, leadingIcon, trailingIcon, color = "primary", className, ...args }: ListItemProps) => { 
  return (
    <Button
      {...args}
      color={color}
      variant="text"
      className={classnames(
        "px-5.5 py-4.5 text-on-surface-variant rounded-none",
        className
      )}
      icon={
        <span className={classnames(
          "material-symbols-outlined text-xl",
          "flex justify-center items-center",
        )}>{leadingIcon}</span>
      }
    >
      <div className="flex flex-col items-start justify-center ml-2 min-w-0">
        <p className="font-medium text-lg align-middle leading-6 text-on-surface">
          {title}
        </p>
        <p className="truncate font-normal">
          {supportingText}
        </p>
      </div>
      <div className="ml-auto flex items-center justify-center text-base proportional-nums">
        <div className="font-normal">{metadata}</div>
        <span className={classnames(
          "material-symbols-outlined",
          "flex justify-center items-center ml-1",
        )}>{trailingIcon}</span>
      </div>
    </Button>
  );
};

export default ListItem;
export type { ListItemProps };