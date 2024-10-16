import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import cn from "clsx";

interface RadioButtonProps {
  label: string;
  value: string;
  name: string;
  className?: string;
  bgDanger?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, bgDanger, name, className }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => {
        return (
          <button
            type="button"
            onClick={() => field.onChange(value)}
            className={cn(
              "w-full text-left py-3 px-4 rounded transition-colors duration-300",
              {
                "bg-green-500 text-white hover:bg-green-600": field.value === value,
                "bg-red-500 border-2 border-red-500": bgDanger && field.value === value,
                "bg-gray-200 text-black hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white": field.value !== value,
              },
              className
            )}
          >
            {label}
          </button>
        );
      }}
    />
  );
};

export default RadioButton;
