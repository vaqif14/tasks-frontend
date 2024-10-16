import cn from "clsx";
import React, { ReactNode } from "react";

interface TypographyProps {
  variant: "h1" | "h2" | "h3" | "p";
  children: ReactNode;
  className?: string;
}

const variantStyles = {
  h1: "text-3xl font-bold",
  h2: "text-2xl font-semibold",
  h3: "text-xl font-medium",
  p: "text-base",
};

const Typography: React.FC<TypographyProps> = ({ variant = "p", children, className = "" }) => {
  const Component = variant;
  const combinedClasses = cn(variantStyles[variant], className);

  return <Component className={combinedClasses}>{children}</Component>;
};

export { Typography };
