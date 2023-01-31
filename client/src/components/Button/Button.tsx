import { ButtonHTMLAttributes, useCallback, useState, MouseEvent } from "react";
import { useNavigate, To } from "react-router-dom";

import { classnames } from "../../Utilities";

import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "tonal" | "text";
  to?: To;
};

const base = `
  bg-transparent text-primary text-center font-medium tracking-[0.01rem]
  px-7 py-3 pt-[0.67rem] align-middle rounded-full relative
  transition-color transition-opacity ease-emphasized before:transition-all before:ease-emphasized

  before:block before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0
  before:bg-transparent before:user-select-none before:-z-1 before:rounded-full

  hover:before:bg-state-layers-primary/8
  focus:before:bg-state-layers-primary/12
  active:before:bg-state-layers-primary/12

  disabled:bg-state-layers-on-surface/12 disabled:text-sys-on-surface/[.38] disabled:cursor-not-allowed
  disabled:before:bg-transparent
`;

const cls = {
  filled: classnames(base, "bg-primary text-white hover:before:bg-sys-on-primary/8 focus:before:bg-sys-on-primary/12 active:before:bg-sys-on-primary/12"),
  text: classnames(base, "px-3 disabled:bg-transparent disable:before:bg-transparent"),
  tonal: classnames(base, "bg-sys-secondary-container text-sys-on-secondary-container hover:before:bg-state-layers-on-secondary-container/8 focus:before:bg-state-layers-on-secondary-container/12 active:before:bg-state-layers-on-secondary-container/12")
};

const Button = ({ variant = "text", children, className, to, ...props }: ButtonProps) => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showRipple, setShowRipple] = useState(false);

  const onClick = useCallback((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (to) navigate(to);
    if (props.onClick) props.onClick(event);
  }, [navigate, props, to]);

  const onMouseDown = useCallback((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    setShowRipple(true);
    setTimeout(() => setShowRipple(false), 600);

    const rect = event.currentTarget.getBoundingClientRect();
    setMousePos({ x: event.clientX - rect.left, y: event.clientY - rect.top });

    if (props.onMouseDown) props.onMouseDown(event);
  }, [props]);

  console.log(styles);

  return (
    <button
      {...props}
      className={classnames(cls[variant], className)}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {typeof children === "string" ? <>{children}</> : <div className="flex flex-row gap-2">{children}</div>}
      <div className="absolute top-0 left-0 overflow-hidden h-full w-full rounded-full">
        <div
          className={classnames(styles.ripple, showRipple && styles["animation-ripple"])}
          style={{ top: mousePos.y, left: mousePos.x }}
        ></div>
      </div>
    </button>
  );
};

export default Button;
export type { ButtonProps };