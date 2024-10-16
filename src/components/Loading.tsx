import React from "react";
import cn from "clsx";

interface LoadingProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const sizeClasses = {
  small: "w-4 h-4 border-2",
  medium: "w-8 h-8 border-4",
  large: "w-12 h-12 border-4",
};

const Loading: React.FC<LoadingProps> = ({ size = "medium", className = "" }) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div className={cn("animate-spin rounded-full border-t-transparent border-solid border-blue-500", sizeClasses[size])} />
    </div>
  );
};

export default Loading;
