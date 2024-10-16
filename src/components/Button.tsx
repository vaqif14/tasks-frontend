import React, { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "clsx";
import RadioButton from "./RadioButton";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  className?: string;
}

const sizeStyles = {
  small: "px-2 py-1 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-6 py-3 text-lg",
};

const ButtonComponent: React.FC<ButtonProps> = ({ children, variant = "primary", size = "medium", className, ...props }) => {
  const baseStyles = "rounded focus:outline-none transition duration-300 font-semibold";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/80 dark:bg-primary dark:hover:bg-primary/70",
    secondary: "bg-secondary text-black hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/70",
  };

  const classes = cn(baseStyles, sizeStyles[size], variants[variant], className);

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
interface CompoundedComponent extends React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>> {
  Radio: typeof RadioButton;
}
const Button = ButtonComponent as CompoundedComponent;
Button.Radio = RadioButton;

export { Button };
