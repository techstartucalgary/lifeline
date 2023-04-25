import {
  ButtonHTMLAttributes,
  MouseEvent,
  ReactNode,
  useCallback,
  useState,
} from "react";
import { To, useNavigate } from "react-router-dom";

import { classnames } from "../../Utilities";

import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "tonal" | "text";
  to?: To;
  icon?: ReactNode | string;
  color?: "primary" | "secondary" | "tertiary";
  ripple?: boolean;
}

const base = `
  bg-transparent text-center font-medium tracking-[0.01rem] overflow-hidden
  px-7 py-3 pt-[0.67rem] align-middle rounded-full !relative
  transition-all ease-emphasized before:transition-all before:ease-emphasized

  before:block before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0
  before:bg-transparent before:user-select-none before:pointer-events-none before:-z-1

  disabled:bg-state-layers-on-surface/12 disabled:text-sys-on-surface/[.38] disabled:cursor-not-allowed
  disabled:before:bg-transparent

  flex flex-row items-center gap-2.5
`;

const cls2 = {
  filled: {
    primary:
      "bg-primary text-white hover:before:bg-sys-on-primary/8 focus:before:bg-sys-on-primary/12 active:before:bg-sys-on-primary/12",
    secondary:
      "bg-secondary text-white hover:before:bg-sys-on-secondary/8 focus:before:bg-sys-on-secondary/12 active:before:bg-sys-on-secondary/12",
    tertiary:
      "bg-tertiary text-white hover:before:bg-sys-on-tertiary/8 focus:before:bg-sys-on-tertiary/12 active:before:bg-sys-on-tertiary/12",
  },
  text: {
    primary:
      "px-3 text-primary hover:before:bg-state-layers-primary/8 disabled:bg-transparent disable:before:bg-transparent",
    secondary:
      "px-3 text-secondary hover:before:bg-state-layers-secondary/8 disabled:bg-transparent disable:before:bg-transparent",
    tertiary:
      "px-3 text-tertiary hover:before:bg-state-layers-tertiary/8 disabled:bg-transparent disable:before:bg-transparent",
  },
  tonal: {
    primary:
      "bg-sys-primary-container text-sys-on-primary-container hover:before:bg-on-primary-container/8 focus:before:bg-on-primary-container/12 active:before:bg-on-primary-container/12",
    secondary:
      "bg-sys-secondary-container text-sys-on-secondary-container hover:before:bg-on-secondary-container/8 focus:before:bg-on-secondary-container/12 active:before:bg-on-secondary-container/12",
    tertiary:
      "bg-sys-tertiary-container text-sys-on-tertiary-container hover:before:bg-on-tertiary-container/8 focus:before:bg-on-tertiary-container/12 active:before:bg-on-tertiary-container/12",
  },
};

const cls3 = {
  filled: {
    primary: "bg-black/20",
    secondary: "bg-black/20",
    tertiary: "bg-black/20",
  },
  text: {
    primary: "bg-primary/12",
    secondary: "bg-secondary/12",
    tertiary: "bg-tertiary/12",
  },
  tonal: {
    primary: "bg-state-layers-on-primary-container/8",
    secondary: "bg-state-layers-on-secondary-container/8",
    tertiary: "bg-state-layers-on-tertiary-container/8",
  },
};

interface RippleProps {
  x: number;
  y: number;
  persist: boolean;
  className?: string;
}

const Ripple = ({ x, y, persist, className }: RippleProps) => {
  return (
    <div
      className={classnames(
        "opacity-0",
        persist && "opacity-100",
        styles.container
      )}
    >
      <div
        className={classnames(styles.ripple, className)}
        style={{ top: y, left: x }}
      />
    </div>
  );
};

const Button = ({
  variant = "text",
  color = "primary",
  children,
  className,
  to,
  icon,
  ripple = true,
  ...props
}: ButtonProps) => {
  const navigate = useNavigate();
  const [rippleQueue, setRippleQueue] = useState<RippleProps[]>([]);

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      if (to) navigate(to);
      if (props.onClick) props.onClick(event);
    },
    [navigate, props, to]
  );

  const onMouseDown = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      if (ripple) {
        const rect = event.currentTarget.getBoundingClientRect();
        rippleQueue.push({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          persist: true,
          className: cls3[variant][color],
        });
        setRippleQueue([...rippleQueue]);
      }

      if (props.onMouseDown) props.onMouseDown(event);
    },
    [color, props, ripple, rippleQueue, variant]
  );

  const onUnpersistRipple = useCallback(() => {
    if (rippleQueue.length === 0) return;

    const ripple = rippleQueue.slice().reverse()[0];
    ripple.persist = false;
    setRippleQueue([...rippleQueue]);

    setTimeout(() => {
      const t = rippleQueue.indexOf(ripple);
      rippleQueue.splice(t, 1);
      setRippleQueue([...rippleQueue]);
    }, 5000);
  }, [rippleQueue]);

  const onMouseLeave = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      onUnpersistRipple();
      if (props.onMouseLeave) props.onMouseLeave(event);
    },
    [onUnpersistRipple, props]
  );

  const onMouseUp = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      onUnpersistRipple();
      if (props.onMouseUp) props.onMouseUp(event);
    },
    [onUnpersistRipple, props]
  );

  const onMouseOut = useCallback(
    (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      onUnpersistRipple();
      if (props.onMouseOut) props.onMouseOut(event);
    },
    [onUnpersistRipple, props]
  );

  return (
    <button
      {...props}
      className={classnames(base, cls2[variant][color], className)}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseOut={onMouseOut}
    >
      {icon &&
        (typeof icon === "string" ? (
          <div className="h-6 w-6 flex justify-center items-center mr-0.5">
            <span className="material-symbols-outlined text-xl">
              {icon}
            </span>
          </div>
        ) : (
          <i className={styles.icon}>{icon}</i>
        ))}
      {children && <>{children}</>}
      {/* RIPPLE */}
      <div className="absolute top-0 left-0 overflow-hidden h-full w-full pointer-events-none -z-10">
        {rippleQueue.map(({ x, y, persist, className }, i) => (
          <Ripple key={i} x={x} y={y} persist={persist} className={className} />
        ))}
      </div>
    </button>
  );
};

export default Button;
export type { ButtonProps };
