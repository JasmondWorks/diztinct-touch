import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-xs font-mono font-medium text-[#AAA] uppercase tracking-wider flex items-center gap-1 select-none",
          className
        )}
        {...props}
      >
        <span>{children}</span>
        {required && <span className="text-[#C9A84C] font-bold">*</span>}
      </label>
    );
  }
);
Label.displayName = "Label";

export { Label };
