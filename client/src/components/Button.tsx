import React from "react";

interface Props {
  width: string;
  height: string; 
  padding: string; 
  colour: string; 
  radius: string; 
  gap: string; 
  onClick: () => void;
  children: any;
}

const Button: React.FC<Props> = ({ 
  width,
  height,
  padding,
  colour, 
  radius,
  gap,
  onClick,
  children
  }) => { 
  return (
    <button 
      onClick={onClick}
      style={{
        width,
        height,
        padding,
        backgroundColor: colour,
        borderRadius: radius,
        gap
      }}
    >
    {children}
    </button>
  );
}

export default Button;