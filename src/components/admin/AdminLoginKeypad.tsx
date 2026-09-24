"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyPinAction } from "@/actions/auth";
import { tokenStorage } from "@/lib/tokenStorage";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AdminLoginKeypad() {
  const router = useRouter();
  const [pin, setPin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [shake, setShake] = useState<boolean>(false);

  const PIN_LENGTH = 4;

  const handleDigit = (digit: string) => {
    if (loading) return;
    if (pin.length < PIN_LENGTH) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setError("");
      if (nextPin.length === PIN_LENGTH) {
        submitPin(nextPin);
      }
    }
  };

  const handleDelete = () => {
    if (loading) return;
    setPin((prev) => prev.slice(0, -1));
    setError("");
  };

  const handleClear = () => {
    if (loading) return;
    setPin("");
    setError("");
  };

  const submitPin = async (candidatePin: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await verifyPinAction(candidatePin);
      if (res.success && res.accessToken) {
        // Store short-lived access token strictly in client memory
        tokenStorage.setAccessToken(res.accessToken);
        router.push("/admin");
        router.refresh();
      } else {
        setError(res.error || "Incorrect PIN");
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setPin("");
        }, 600);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setPin("");
      }, 600);
    } finally {
      setLoading(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        handleDigit(e.key);
      } else if (e.key === "Backspace") {
        handleDelete();
      } else if (e.key === "Escape") {
        handleClear();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pin, loading]);

  return (
    <div className="w-full max-w-sm relative z-10">
      {/* Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block group mb-4">
          <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-linear-to-br from-[#9f1239] via-[#cc2b43] to-[#db4d24] text-white font-bold text-base shadow-md group-hover:scale-105 transition-transform">
            {siteConfig.monogram}
          </div>
        </Link>
        <Badge variant="outline" className="gap-1.5 border-primary/20 bg-primary/5 text-primary mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Security Verification</span>
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground-heading">
          Studio Access
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-mono tracking-wider">
          ENTER 4-DIGIT SECURITY PIN
        </p>
      </div>

      {/* PIN Indicators */}
      <div className={`flex justify-center items-center gap-4 mb-8 ${shake ? "animate-bounce" : ""}`}>
        {Array.from({ length: PIN_LENGTH }).map((_, i) => (
          <div
            key={i}
            className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 ${
              i < pin.length
                ? "bg-primary border-primary scale-110 shadow-[0_0_14px_rgba(242,89,114,0.6)]"
                : "border-border bg-muted/40"
            }`}
          />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs text-center font-mono animate-fadeIn">
          {error}
        </div>
      )}

      {/* Tactile Keypad */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            type="button"
            variant="ghost"
            onClick={() => handleDigit(num.toString())}
            disabled={loading}
            className="h-16 rounded-2xl bg-card/60 hover:bg-primary/10 border border-border/80 hover:border-primary/40 text-xl font-mono text-foreground hover:text-primary active:scale-95 transition-all flex items-center justify-center cursor-pointer font-semibold"
          >
            {num}
          </Button>
        ))}
        <Button
          type="button"
          variant="ghost"
          onClick={handleClear}
          disabled={loading}
          className="h-16 rounded-2xl bg-card/40 hover:bg-muted/60 border border-border/60 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground active:scale-95 transition-all flex items-center justify-center cursor-pointer"
        >
          Clear
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => handleDigit("0")}
          disabled={loading}
          className="h-16 rounded-2xl bg-card/60 hover:bg-primary/10 border border-border/80 hover:border-primary/40 text-xl font-mono text-foreground hover:text-primary active:scale-95 transition-all flex items-center justify-center cursor-pointer font-semibold"
        >
          0
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={handleDelete}
          disabled={loading}
          className="h-16 rounded-2xl bg-card/40 hover:bg-muted/60 border border-border/60 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground active:scale-95 transition-all flex items-center justify-center cursor-pointer"
        >
          Del
        </Button>
      </div>

      {/* Footer info */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Portfolio</span>
        </Link>
      </div>
    </div>
  );
}
