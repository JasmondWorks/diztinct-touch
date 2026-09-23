import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          className={cn(
            "flex h-11 w-full appearance-none rounded-xl border bg-white/[0.03] px-3.5 py-2 text-xs font-mono text-[#F9F6F0] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A84C] disabled:cursor-not-allowed disabled:opacity-50 pr-9 cursor-pointer",
            error
              ? "border-red-500/50 focus-visible:ring-red-400"
              : "border-white/10 hover:border-white/20 focus-visible:border-[#C9A84C]",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute right-3 top-3.5 text-[#888]">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
