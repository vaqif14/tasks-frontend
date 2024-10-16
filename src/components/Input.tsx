import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import cn from "clsx";

interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number";
  className?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  required?: boolean;
}

const sizeStyles = {
  small: "px-2 py-1 text-sm",
  medium: "px-3 py-2 text-base",
  large: "px-4 py-3 text-lg",
};

export const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder = "",
  type = "text",
  className = "",
  size = "medium",
  disabled = false,
  required = false,
}) => {
  const { control } = useFormContext();

  return (
    <div className="mb-4">
      {label && <label className="block mb-2 font-semibold">{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "w-full border rounded focus:outline-none focus:ring-2 transition duration-300",
                sizeStyles[size],
                {
                  "bg-gray-100 text-gray-600 cursor-not-allowed": disabled,
                  "border-red-500 focus:ring-red-500": error,
                  "border-gray-300 focus:ring-blue-500": !error,
                },
                className
              )}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          </>
        )}
        rules={{ required }}
      />
    </div>
  );
};

export default Input;
