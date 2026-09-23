import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30",
        gold:
          "bg-[#C9A84C] text-[#0A0A0A] font-semibold",
        success:
          "bg-emerald-950/60 text-emerald-300 border border-emerald-800/40",
        warning:
          "bg-amber-950/60 text-amber-300 border border-amber-800/40",
        destructive:
          "bg-red-950/60 text-red-300 border border-red-800/40",
        secondary:
          "bg-white/5 text-[#AAA] border border-white/10",
        outline:
          "border border-white/20 text-[#DDD]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
