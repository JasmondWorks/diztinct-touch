import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider transition-colors select-none font-medium",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary border border-primary/20",
        primary:
          "bg-primary text-primary-foreground font-semibold shadow-xs",
        gold:
          "bg-primary/10 text-primary border border-primary/20 font-semibold",
        success:
          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
        warning:
          "bg-amber-500/10 text-amber-400 border border-amber-500/20",
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/20",
        secondary:
          "bg-secondary text-secondary-foreground border border-border",
        outline:
          "border border-border/80 text-foreground",
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
