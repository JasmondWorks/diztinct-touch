import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[96px] w-full rounded-xl border bg-white/[0.03] p-3 text-xs font-mono text-[#F9F6F0] placeholder:text-[#666] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A84C] disabled:cursor-not-allowed disabled:opacity-50",
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
Textarea.displayName = "Textarea";

export { Textarea };
