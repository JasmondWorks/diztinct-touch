import * as React from "react";
import { Label } from "./label";
import { Textarea, TextareaProps } from "./textarea";
import { cn } from "@/lib/utils";

export interface TextareaFieldProps extends TextareaProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  containerClassName?: string;
}

const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
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
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className={cn("space-y-1.5 w-full", containerClassName)}>
        {label && (
          <Label htmlFor={textareaId} required={required}>
            {label}
          </Label>
        )}
        <Textarea
          id={textareaId}
          ref={ref}
          error={Boolean(errorMessage)}
          className={className}
          {...props}
        />
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
TextareaField.displayName = "TextareaField";

export { TextareaField };
