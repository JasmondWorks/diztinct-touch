import * as React from "react";
import { Label } from "./label";
import { Input, InputProps } from "./input";
import { cn } from "@/lib/utils";

export interface InputFieldProps extends InputProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  containerClassName?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      required,
      className,
      containerClassName,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className={cn("space-y-1.5 w-full", containerClassName)}>
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}
        <Input
          id={inputId}
          ref={ref}
          error={Boolean(errorMessage)}
          className={className}
          {...props}
        />
        {helperText && !errorMessage && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
        {errorMessage && (
          <p className="text-xs text-destructive animate-fadeIn">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);
InputField.displayName = "InputField";

export { InputField };
