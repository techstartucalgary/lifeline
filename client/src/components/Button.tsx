import { ReactNode, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "filled" | "tonal" | "text";
  className?: string;
};

const classNames = {
  filled: `
    bg-primary text-white text-center font-medium tracking-[0.01rem]
    px-6 py-3 pt-[0.67rem] align-middle rounded-full relative
    transition-all before:transition-all

    before:block before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0
    before:bg-none before:user-select-none before:-z-1 before:rounded-full

    hover:before:bg-light-on-primary/[.08]
    focus:before:bg-light-on-primary/[.12]
    active:before:bg-light-on-primary/[.12]

    disabled:bg-light-on-surface/[.12] disabled:text-light-on-surface/[.38] disabled:cursor-not-allowed
  `,
  text: `
    bg-none text-primary text-center font-medium tracking-[0.01rem]
    px-3 py-3 pt-[0.67rem] align-middle rounded-full relative
    transition-all before:transition-all

    before:block before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0
    before:bg-none before:user-select-none before:-z-1 before:rounded-full

    hover:before:bg-state-layers-light-primary/[.08]
    focus:before:bg-state-layers-light-primary/[.12]
    active:before:bg-state-layers-light-primary/[.12]

    disabled:bg-light-on-surface/[.12] disabled:text-light-on-surface/[.38] disabled:cursor-not-allowed
  `,
  tonal: `
    bg-light-secondary-container text-light-on-secondary-container text-center font-medium tracking-[0.01rem]
    px-6 py-3 pt-[0.67rem] align-middle rounded-full relative
    transition-all before:transition-all

    before:block before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0
    before:bg-none before:user-select-none before:-z-1 before:rounded-full

    hover:before:bg-state-layers-on-secondary-container/[.08]
    focus:before:bg-state-layers-on-secondary-container/[.12]
    active:before:bg-state-layers-on-secondary-container/[.12]

    disabled:bg-light-on-surface/[.12] disabled:text-light-on-surface/[.38] disabled:cursor-not-allowed
  `,
};

const Button = ({ variant = "text", children, className, ...props }: ButtonProps) => {
  return <button className={twMerge([classNames[variant], className].join(" "))} {...props}>{children}</button>;
};

export default Button;
