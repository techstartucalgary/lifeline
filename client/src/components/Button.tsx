import { ReactNode, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  variant?: "filled" | "tonal" | "text";
  className?: string;
};

const base = `
  bg-transparent text-primary text-center font-medium tracking-[0.01rem]
  px-7 py-3 pt-[0.67rem] align-middle rounded-full relative
  transition-all before:transition-all

  before:block before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0
  before:bg-transparent before:user-select-none before:-z-1 before:rounded-full

  hover:before:bg-state-layers-primary/8
  focus:before:bg-state-layers-primary/12
  active:before:bg-state-layers-primary/12

  disabled:bg-sys-on-surface/12 disabled:text-sys-on-surface/[.38] disabled:cursor-not-allowed
  disabled:before:bg-transparent
`;

const classnames = {
  filled: twMerge(base, "bg-primary text-white hover:before:bg-sys-on-primary/8 focus:before:bg-sys-on-primary/12 active:before:bg-sys-on-primary/12"),
  text: twMerge(base, "px-3 disabled:bg-transparent disable:before:bg-transparent"),
  tonal: twMerge(base, "bg-sys-secondary-container text-sys-on-secondary-container hover:before:bg-state-layers-on-secondary-container/8 focus:before:bg-state-layers-on-secondary-container/[.12] active:before:bg-state-layers-on-secondary-container/[.12]"),
};

const Button = ({ variant = "text", children, className, ...props }: ButtonProps) => {
  return <button className={twMerge(classnames[variant], className)} {...props}>
    {typeof children === "string" ? <>{children}</> : <div className="flex flex-row gap-2">{children}</div>}
  </button>;
};

export default Button;
