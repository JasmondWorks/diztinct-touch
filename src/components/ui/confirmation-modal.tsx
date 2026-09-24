"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog";
import { Button } from "./button";
import { AlertTriangle, LucideIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ConfirmationModalProps {
  /** Controls modal visibility */
  isOpen: boolean;
  /** Callback fired when modal open state changes */
  setIsOpen: (open: boolean) => void;
  /** Primary title of the confirmation prompt */
  title: React.ReactNode;
  /** Secondary explanatory text. Defaults to irreversible action warning */
  subtitle?: React.ReactNode;
  /** Optional icon to display. Defaults to AlertTriangle */
  icon?: LucideIcon;
  /** Visual theme for the confirmation action. Defaults to 'destructive' */
  variant?: "destructive" | "warning" | "default" | "emerald";
  /** Text for the confirmation action button. Defaults to 'Confirm' */
  confirmLabel?: string;
  /** Text for the cancel action button. Defaults to 'Cancel' */
  cancelLabel?: string;
  /** Callback executed when user confirms the action */
  onConfirm: () => void | Promise<unknown> | unknown;
  /** Optional callback executed when user cancels or dismisses */
  onCancel?: () => void;
  /** Indicates ongoing async mutation */
  isLoading?: boolean;
  /** Optional children for contextual preview (e.g. project details card) */
  children?: React.ReactNode;
  /** Modal width constraint. Defaults to 'default' */
  size?: "sm" | "default" | "lg";
  /** Optional container class */
  className?: string;
}

const sizeClasses = {
  sm: "max-w-sm",
  default: "max-w-md",
  lg: "max-w-lg",
};

export function ConfirmationModal({
  isOpen,
  setIsOpen,
  title,
  subtitle = "Are you sure you want to perform this action? It cannot be undone.",
  icon: Icon = AlertTriangle,
  variant = "destructive",
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
  children,
  size = "default",
  className,
}: ConfirmationModalProps) {
  const handleCancel = () => {
    if (isLoading) return;
    onCancel?.();
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    if (isLoading) return;
    await onConfirm();
  };

  // Determine icon and confirm button styling based on variant
  const variantStyles = {
    destructive: {
      iconBg: "bg-destructive/10 text-destructive border-destructive/20",
      buttonVariant: "destructive" as const,
      defaultConfirmLabel: "Delete Permanently",
    },
    warning: {
      iconBg: "bg-amber-400/10 text-amber-500 border-amber-400/20",
      buttonVariant: "default" as const,
      defaultConfirmLabel: "Proceed",
    },
    emerald: {
      iconBg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      buttonVariant: "emerald" as const,
      defaultConfirmLabel: "Confirm",
    },
    default: {
      iconBg: "bg-primary/10 text-primary border-primary/20",
      buttonVariant: "default" as const,
      defaultConfirmLabel: "Confirm",
    },
  }[variant];

  const resolvedConfirmLabel = confirmLabel || variantStyles.defaultConfirmLabel;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isLoading && setIsOpen(open)}>
      <DialogContent
        className={cn(
          sizeClasses[size],
          "p-6 sm:p-7 border border-border/80 bg-card/95 backdrop-blur-xl rounded-2xl",
          className
        )}
      >
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Architectural Icon Capsule */}
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border",
              variantStyles.iconBg
            )}
          >
            <Icon className="h-6 w-6" />
          </div>

          <div className="flex-1 space-y-1.5">
            <DialogHeader className="text-left space-y-1 p-0">
              <DialogTitle className="text-lg font-bold tracking-tight text-foreground-heading">
                {title}
              </DialogTitle>
              {subtitle && (
                <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
                  {subtitle}
                </DialogDescription>
              )}
            </DialogHeader>

            {/* Optional contextual metadata/details */}
            {children && <div className="pt-2">{children}</div>}
          </div>
        </div>

        <DialogFooter className="mt-6 flex-row justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1 sm:flex-none text-xs"
          >
            {cancelLabel}
          </Button>

          <Button
            type="button"
            variant={variantStyles.buttonVariant}
            size="sm"
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1 sm:flex-none text-xs gap-1.5 font-semibold"
          >
            {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            <span>{isLoading ? "Processing..." : resolvedConfirmLabel}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
