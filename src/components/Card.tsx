import React, { ReactNode } from "react";
import cn from "clsx";
import { useTheme } from "../hooks/useTheme";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  const { theme } = useTheme();
  const classes = cn(
    "shadow-md rounded-lg p-4 transition-colors duration-300",
    {
      "bg-white text-black": theme === "light",
      "bg-gray-800 text-white": theme === "dark",
    },
    className
  );
  return <div className={classes}>{children}</div>;
};
