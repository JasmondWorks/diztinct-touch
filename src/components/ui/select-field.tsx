"use client";

import * as React from "react";
import { Label } from "./label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select";
import { cn } from "@/lib/utils";

export interface SelectFieldProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  containerClassName?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onChange?: (e: { target: { value: string } }) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
  options?: { value: string; label: string }[];
  children?: React.ReactNode;
}

const SelectField = React.forwardRef<HTMLButtonElement, SelectFieldProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      required,
      className,
      containerClassName,
      placeholder = "Select an option...",
      value,
      defaultValue,
      onValueChange,
      onChange,
      disabled,
      name,
      id,
      options,
      children,
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const handleValueChange = (val: string) => {
      onValueChange?.(val);
      onChange?.({ target: { value: val } });
    };

    return (
      <div className={cn("space-y-1.5 w-full", containerClassName)}>
        {label && (
          <Label htmlFor={selectId} required={required}>
            {label}
          </Label>
        )}

        <Select
          value={value}
          defaultValue={defaultValue}
          onValueChange={handleValueChange}
          disabled={disabled}
          name={name}
        >
          <SelectTrigger
            id={selectId}
            ref={ref}
            error={Boolean(errorMessage)}
            className={className}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options
              ? options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))
              : children}
          </SelectContent>
        </Select>

        {helperText && !errorMessage && (
          <p className="text-[11px] font-mono text-muted-foreground">{helperText}</p>
        )}
        {errorMessage && (
          <p className="text-[11px] font-mono text-destructive animate-fadeIn">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);
SelectField.displayName = "SelectField";

export { SelectField };
