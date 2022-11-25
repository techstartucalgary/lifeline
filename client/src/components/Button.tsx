import React from "react";

interface Props {
  width: string;
  height: string; 
  onClick: () => void;
  children: any;
}

const Button: React.FC<Props> = ({ 
  width,
  height,
  onClick,
  children
  }) => { 
  return (
    <button className='bg-burgundy p-0 gap-2'>
    {children}
    </button>
  );
}

export default Button;

