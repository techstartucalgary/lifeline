import { ButtonHTMLAttributes, useCallback, useState, MouseEvent, ReactNode } from "react";
import { useNavigate, To } from "react-router-dom";

import { classnames } from "../../Utilities";

import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "tonal" | "text";
  to?: To;
  icon?: ReactNode | string | undefined;
};

const base = `
  bg-transparent text-primary text-center font-medium tracking-[0.01rem] overflow-hidden
  px-7 py-3 pt-[0.67rem] align-middle rounded-full relative
  transition-color transition-opacity ease-emphasized before:transition-all before:ease-emphasized

  before:block before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0
  before:bg-transparent before:user-select-none before:-z-1

  hover:before:bg-state-layers-primary/8
  focus:before:bg-state-layers-primary/12
  active:before:bg-state-layers-primary/12

  disabled:bg-state-layers-on-surface/12 disabled:text-sys-on-surface/[.38] disabled:cursor-not-allowed
  disabled:before:bg-transparent

  flex flex-row items-center
`;

const cls = {
  filled: classnames(base, "bg-primary text-white hover:before:bg-sys-on-primary/8 focus:before:bg-sys-on-primary/12 active:before:bg-sys-on-primary/12"),
  text: classnames(base, "px-3 disabled:bg-transparent disable:before:bg-transparent"),
  tonal: classnames(base, "bg-sys-secondary-container text-sys-on-secondary-container hover:before:bg-state-layers-on-secondary-container/8 focus:before:bg-state-layers-on-secondary-container/12 active:before:bg-state-layers-on-secondary-container/12")
};

interface RippleProps {
  x: number;
  y: number;
  persist: boolean;
}

const Ripple = ({ x, y, persist }: RippleProps) => {
  return (
    <div className={classnames("opacity-0", persist && "opacity-100", styles.container)}>
      <div className={styles.ripple} style={{ top: y, left: x }} />
    </div>
  );
};

const Button = ({ variant = "text", children, className, to, icon, ...props }: ButtonProps) => {
  const navigate = useNavigate();
  const [rippleQueue, setRippleQueue] = useState<RippleProps[]>([]);

  const onClick = useCallback((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (to) navigate(to);
    if (props.onClick) props.onClick(event);
  }, [navigate, props, to]);

  const onMouseDown = useCallback((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    rippleQueue.push({ x: event.clientX - rect.left, y: event.clientY - rect.top, persist: true });
    setRippleQueue([...rippleQueue]);

    if (props.onMouseDown) props.onMouseDown(event);
  }, [props, rippleQueue]);

  const onUnpersistRipple = useCallback(() => {
    const ripple = rippleQueue.reverse()[0];
    ripple.persist = false;
    setRippleQueue([...rippleQueue]);

    setTimeout(() => {
      const t = rippleQueue.indexOf(ripple);
      rippleQueue.splice(t, 1);
      setRippleQueue([...rippleQueue]);
    }, 5000);
  }, [rippleQueue]);

  const onMouseLeave = useCallback((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    onUnpersistRipple();
    if (props.onMouseLeave) props.onMouseLeave(event);
  }, [onUnpersistRipple, props]);

  const onMouseUp = useCallback((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    onUnpersistRipple();
    if (props.onMouseUp) props.onMouseUp(event);
  }, [onUnpersistRipple, props]);

  const onMouseOut = useCallback((event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    onUnpersistRipple();
    if (props.onMouseOut) props.onMouseOut(event);
  }, [onUnpersistRipple, props]);

  return (
    <button
      {...props}
      className={classnames(cls[variant], className)}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseOut={onMouseOut}
    >
      {icon && (
        typeof icon === "string"
          ? <i className={classnames("material-symbols-outlined", styles.icon)}>{icon}</i>
          : <i className={styles.icon}>{icon}</i>
      )}
      {children && (
        typeof children === "string"
          ? <>{children}</>
          : <div className="flex flex-row gap-2 w-full">{children}</div>
      )}
      {/* RIPPLE */}
      <div className="absolute top-0 left-0 overflow-hidden h-full w-full pointer-events-none">
        {
          rippleQueue.map(({ x, y, persist }, i) => (
            <Ripple key={i} x={x} y={y} persist={persist} />
          ))
        }
      </div>
    </button>
  );
};

export default Button;
export type { ButtonProps };