import * as React from "react";
import { Label } from "./label";
import { Select, SelectProps } from "./select";
import { cn } from "@/lib/utils";

export interface SelectFieldProps extends SelectProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  containerClassName?: string;
  options?: { value: string; label: string }[];
}

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      required,
      className,
      containerClassName,
      id,
      options,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className={cn("space-y-1.5 w-full", containerClassName)}>
        {label && (
          <Label htmlFor={selectId} required={required}>
            {label}
          </Label>
        )}
        <Select
          id={selectId}
          ref={ref}
          error={Boolean(errorMessage)}
          className={className}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#121212] text-[#F9F6F0]">
                  {opt.label}
                </option>
              ))
            : children}
        </Select>
        {helperText && !errorMessage && (
          <p className="text-[11px] font-mono text-[#666]">{helperText}</p>
        )}
        {errorMessage && (
          <p className="text-[11px] font-mono text-red-400 animate-fadeIn">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);
SelectField.displayName = "SelectField";

export { SelectField };
