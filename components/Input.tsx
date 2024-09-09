import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { FaFile } from "react-icons/fa";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <div className={`flex w-full items-center gap-x-2 relative ${type === 'file' && 'bg-neutral-700 px-3'}`}>
        <input
          type={type}
          className={twMerge(`
            flex
            w-full
            rounded-md
            border
            border-transparent
            bg-neutral-700
            px-3
            py-3
            text-sm
            file:border-0
            file:bg-transparent
            file:text-sm
            file:font-medium
            placeholder:text-neutral-400
            disabled:cursor-not-allowed
            disabled:opacity-50
            focus:outline-none
        `)}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {
          type === 'file' &&
          <FaFile size={22}  className="cursor-pointer absolute right-[10px]"/>
        }
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
