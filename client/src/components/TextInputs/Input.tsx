import { InputHTMLAttributes, ReactNode, useId } from "react";

import { classnames } from "../../Utilities";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onValueChange?: (v: string) => void;
  leadingIcon?: string | ReactNode;
}

const Input = ({ label, onValueChange, leadingIcon, ...args }: InputProps) => {
  const id = useId();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.target.value);
    args.onChange?.(e);
  };

  return (
    <div className="relative w-full">
      {/* Adapted from https://flowbite.com/docs/forms/floating-label/ */}
      <input
        type="text"
        {...args}
        id={id}
        onChange={onChange}
        className={classnames(
          "block px-3 pb-3 pt-3.5 w-full text-sm text-on-surface bg-transparent peer",
          "rounded-xl border-[0.1rem] border-outline-variant appearance-none",
          "focus:outline-none focus:ring-0 focus:border-primary caret-primary",
          "transition-color duration-100 ease-in",
          leadingIcon && "pl-8",
          args.className
        )}
        placeholder={args.placeholder || " "}
      />

      <div className="absolute left-0 top-0 h-full px-3 pt-0.5 z-20 flex flex-col justify-center items-center">
        <div className="material-symbols-outlined text-base text-on-surface">
          {leadingIcon}
        </div>
      </div>

      <label
        htmlFor={id}
        className={classnames(
          "absolute text-sm text-gray-500 duration-300 ease-emphasized",
          "transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface",
          "rounded-full px-2 left-1.5 transition-all",
          "peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-focus:left-1.5",
          "peer-placeholder-shown:top-[1.96rem] peer-focus:top-2",
          "peer-focus:scale-75 peer-focus:-translate-y-4",
          (args.value === null ||
            args.value === undefined ||
            args.value.toString() === "") &&
            leadingIcon &&
            "left-7"
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
