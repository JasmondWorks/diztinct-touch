import React from "react";
import { LucideIcon, Search, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface EmptyStateProps {
  /** Optional icon to display. Defaults to Search */
  icon?: LucideIcon;
  /** Primary title of the empty state */
  title: string;
  /** Explanatory description */
  description?: string;
  /** Label for the primary action button (e.g. "Reset Filters", "Clear Search") */
  actionLabel?: string;
  /** Callback when primary action button is clicked */
  onAction?: () => void;
  /** Icon for the action button. Defaults to RotateCcw if actionLabel contains "reset" or "clear" */
  actionIcon?: LucideIcon;
  /** Secondary action label */
  secondaryActionLabel?: string;
  /** Callback for secondary action */
  onSecondaryAction?: () => void;
  /** Optional children for custom content */
  children?: React.ReactNode;
  /** Compact padding variant for inline tables or tight containers */
  compact?: boolean;
  /** Custom container class */
  className?: string;
}

export function EmptyState({
  icon: Icon = Search,
  title,
  description,
  actionLabel,
  onAction,
  actionIcon: ActionIcon = RotateCcw,
  secondaryActionLabel,
  onSecondaryAction,
  children,
  compact = false,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-border/80 bg-card/40 transition-colors",
        compact ? "p-6 sm:p-8" : "p-8 sm:p-14 my-4",
        className
      )}
    >
      {/* Icon Capsule */}
      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-muted/60 border border-border/70 text-primary mb-4 transition-transform duration-300 hover:scale-105">
        <Icon className="h-6 w-6 text-primary" />
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground-heading mb-1.5">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mb-5">
          {description}
        </p>
      )}

      {/* Action Buttons */}
      {(onAction || onSecondaryAction || children) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {onAction && actionLabel && (
            <Button
              onClick={onAction}
              variant="default"
              size="sm"
              className="gap-2 text-xs font-semibold"
            >
              {ActionIcon && <ActionIcon className="h-3.5 w-3.5" />}
              <span>{actionLabel}</span>
            </Button>
          )}

          {onSecondaryAction && secondaryActionLabel && (
            <Button
              onClick={onSecondaryAction}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              <span>{secondaryActionLabel}</span>
            </Button>
          )}

          {children}
        </div>
      )}
    </div>
  );
}
