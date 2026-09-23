import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xs font-mono font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A84C] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#C9A84C] text-[#0A0A0A] font-semibold hover:bg-[#D4B55E] shadow-sm",
        secondary:
          "bg-white/5 text-[#F9F6F0] hover:bg-white/10 border border-white/10",
        outline:
          "border border-white/15 bg-transparent hover:border-[#C9A84C]/50 hover:text-[#C9A84C] text-[#DDD]",
        ghost:
          "hover:bg-white/5 hover:text-[#F9F6F0] text-[#8A8A8A]",
        destructive:
          "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30",
        link:
          "text-[#C9A84C] underline-offset-4 hover:underline p-0 h-auto",
        emerald:
          "bg-[#25D366] text-black font-semibold hover:bg-[#20b858] shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-[11px]",
        lg: "h-12 rounded-xl px-6 text-sm font-semibold",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
