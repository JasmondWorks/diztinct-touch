"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  RotateCcw,
  ArrowLeft,
  MessageSquare,
  AlertTriangle,
  Terminal,
  ChevronDown,
  ChevronUp,
  Check,
  Copy,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/data/siteConfig";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Log exception to client console for telemetry
    console.error("DIZTINCT TOUCH Architectural Portal Exception:", error);
  }, [error]);

  const copyErrorDetails = () => {
    const errorPayload = `Error: ${error.message}\nDigest: ${error.digest || "N/A"}\nTimestamp: ${new Date().toISOString()}`;
    navigator.clipboard.writeText(errorPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative selection:bg-primary/20">
      {/* Background Architectural Dot Grid */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl space-y-8 animate-fadeIn">
        {/* Status Badge */}
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className="gap-2 px-3.5 py-1 text-xs border-destructive/40 bg-destructive/10 text-destructive"
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>RENDER EXCEPTION • CODE 500</span>
          </Badge>
        </div>

        {/* Headline & Architectural Context */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground-heading">
            Structural Exception Encountered
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            An unexpected error occurred while compiling this architectural view.
            You can re-attempt rendering or return to a verified section of the portfolio.
          </p>
        </div>

        {/* UI Recovery Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {/* Action 1: Reset / Re-attempt */}
          <Button
            size="lg"
            onClick={() => reset()}
            className="gap-2 text-xs cursor-pointer shadow-xs"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Re-attempt Rendering</span>
          </Button>

          {/* Action 2: Return to Homepage */}
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 text-xs cursor-pointer"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span>Studio Homepage</span>
            </Link>
          </Button>

          {/* Action 3: Projects index */}
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="gap-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <Link href="/#projects">
              <Building2 className="h-4 w-4 text-primary" />
              <span>Verified Projects</span>
            </Link>
          </Button>
        </div>

        {/* Technical Diagnostics Collapsible (Discreet) */}
        <div className="pt-6 border-t border-border/80 text-left">
          <button
            type="button"
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="flex items-center justify-between w-full p-3 rounded-xl border border-border/80 bg-card/60 text-xs text-muted-foreground hover:text-foreground hover:border-border transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Terminal className="h-3.5 w-3.5 text-primary" />
              <span>Technical Diagnostics &amp; Digest</span>
            </div>
            {showTechnicalDetails ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>

          {showTechnicalDetails && (
            <div className="mt-3 p-4 rounded-xl border border-border/80 bg-black/60 backdrop-blur-md space-y-3 text-xs animate-fadeIn">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                  Error Signature
                </span>
                <button
                  type="button"
                  onClick={copyErrorDetails}
                  className="flex items-center gap-1.5 text-[11px] text-primary hover:underline cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy Log</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-1.5 overflow-x-auto text-[11px] leading-relaxed">
                <p className="text-destructive font-medium break-all">
                  {error.message || "An unidentified rendering error occurred."}
                </p>
                {error.digest && (
                  <p className="text-muted-foreground">
                    Digest ID: <span className="text-foreground">{error.digest}</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Support Consultation Footer */}
        <div className="pt-2">
          <p className="text-xs text-muted-foreground">
            Persistent issue? Direct message to lead architect Mayowa via{" "}
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>WhatsApp</span>
              <MessageSquare className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
