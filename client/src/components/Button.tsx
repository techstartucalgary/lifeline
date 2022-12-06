import React from "react";

interface Props {
  variant: string;
  disabled: boolean;
  children: any;
}

const Button: React.FC<Props> = ({ children, variant, disabled }) => {
  if (variant === "filled" && disabled == false) {
    return (
      <button className="bg-burgundy text-white shadow-none text-center text-sm tracking-wideset text-medium baseline font-poppins gap-2 p-0 px-6 h-10 rounded-full hover:bg-burgundy hover:shadow-md hover:opacity-[.92] active:opacity-[0.88] active:bg-burgundy">
        {children}
      </button>
    );
  } else if (variant === "filled" && disabled == true) {
    return (
      <button className="bg-disabled text-white text-opacity-[.38] text-sm text-center tracking-wideset baseline text-medium font-poppins gap-2 p-0 px-6 h-10 rounded-full opacity-[.12]">
        {children}
      </button>
    );
  } else if (variant === "tonal" && disabled == false) {
    return (
      <button className="bg-tonal text-tonalText shadow-none text-center text-sm tracking-wideset text-medium baseline font-poppins gap-2 p-0 px-6 h-10 rounded-full hover:bg-tonal hover:shadow-sm hover:opacity-[.92] active:opacity-[0.88] active:bg-tonal">
        {children}
      </button>
    );
  } else if (variant === "tonal" && disabled == true) {
    return (
      <button className="bg-disabled text-white text-opacity-[.38] text-sm text-center tracking-wideset baseline text-medium font-poppins gap-2 p-0 px-6 h-10 rounded-full opacity-[.12]">
        {children}
      </button>
    );
  } else if (variant === "text" && disabled == false) {
    return (
      <button className="bg-white text-burgundy shadow-none text-center text-sm tracking-wideset text-medium baseline font-poppins gap-2 p-0 px-6 h-10 rounded-full hover:bg-textHover hover:shadow-md hover:opacity-[.92] active:opacity-[0.88] active:bg-textHover">
        {children}
      </button>
    );
  } else if (variant === "text" && disabled == true) {
    return (
      <button className="bg-white text-textdis text-opacity-[.38] text-sm text-center tracking-wideset baseline text-medium font-poppins gap-2 p-0 px-6 h-10 rounded-full">
        {children}
      </button>
    );
  }
  return null;
};

export default Button;
