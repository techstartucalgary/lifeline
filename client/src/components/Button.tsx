import React, { ButtonHTMLAttributes } from 'react';

// interface to declare all our prop types
interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: string, // default, secondary, etc.
  size?: string, // sm, md, lg
  disabled?: boolean,
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'],
}

// button component, consuming props
const Button: React.FC<Props> = ({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  disabled,
  ...rest
}) => {
  return (
    <button
      className={`btn ${variant} ${size} mx-10 my-10 rounded-full font-medium font-body text-sm` + (disabled ? ' disabled' : '')}
      onClick={onClick}
      disabled={disabled}
      type={rest.type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;