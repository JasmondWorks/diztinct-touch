import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border bg-white/[0.03] px-3.5 py-2 text-xs font-mono text-[#F9F6F0] placeholder:text-[#666] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A84C] disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-red-500/50 focus-visible:ring-red-400"
            : "border-white/10 hover:border-white/20 focus-visible:border-[#C9A84C]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
