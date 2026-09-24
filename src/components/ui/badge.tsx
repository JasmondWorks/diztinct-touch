import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider transition-colors select-none font-semibold",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-neutral-950 font-bold shadow-xs",
        primary:
          "bg-primary text-neutral-950 font-bold shadow-xs",
        gold:
          "bg-amber-400 text-neutral-950 font-bold shadow-xs border border-amber-300/40",
        warning:
          "bg-amber-100 text-amber-950 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-400/40 font-semibold",
        success:
          "bg-emerald-100 text-emerald-950 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-500/40 font-semibold",
        destructive:
          "bg-red-100 text-red-950 border border-red-300 dark:bg-red-950/60 dark:text-red-300 dark:border-red-500/40 font-semibold",
        secondary:
          "bg-secondary text-secondary-foreground border border-border font-medium",
        outline:
          "border border-border bg-card/60 text-foreground font-medium",
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
