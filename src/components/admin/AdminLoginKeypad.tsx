"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyPinAction } from "@/actions/auth";
import { tokenStorage } from "@/lib/tokenStorage";
import Link from "next/link";

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
          <span className="text-xs font-mono tracking-[0.25em] text-[#C9A84C] uppercase border border-[#C9A84C]/30 px-3 py-1 rounded-full group-hover:border-[#C9A84C] transition-colors">
            DIZTINCT TOUCH HOME DESIGN
          </span>
        </Link>
        <h1 className="text-2xl font-serif tracking-tight text-[#F9F6F0]">
          Internal Access Portal
        </h1>
        <p className="text-xs text-[#8A8A8A] mt-1 font-mono tracking-wider">
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
                ? "bg-[#C9A84C] border-[#C9A84C] scale-110 shadow-[0_0_12px_rgba(201,168,76,0.6)]"
                : "border-white/20 bg-white/5"
            }`}
          />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-3 rounded bg-red-950/40 border border-red-800/40 text-red-300 text-xs text-center font-mono animate-fadeIn">
          {error}
        </div>
      )}

      {/* Tactile Keypad */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleDigit(num.toString())}
            disabled={loading}
            className="h-16 rounded-xl bg-white/[0.03] hover:bg-[#C9A84C]/10 border border-white/10 hover:border-[#C9A84C]/40 text-xl font-mono text-[#F9F6F0] active:scale-95 transition-all flex items-center justify-center backdrop-blur-sm shadow-sm cursor-pointer"
          >
            {num}
          </button>
        ))}
        <button
          type="button"
          onClick={handleClear}
          disabled={loading}
          className="h-16 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-xs font-mono uppercase tracking-wider text-[#8A8A8A] active:scale-95 transition-all flex items-center justify-center cursor-pointer"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => handleDigit("0")}
          disabled={loading}
          className="h-16 rounded-xl bg-white/[0.03] hover:bg-[#C9A84C]/10 border border-white/10 hover:border-[#C9A84C]/40 text-xl font-mono text-[#F9F6F0] active:scale-95 transition-all flex items-center justify-center backdrop-blur-sm cursor-pointer"
        >
          0
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="h-16 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-xs font-mono uppercase tracking-wider text-[#8A8A8A] active:scale-95 transition-all flex items-center justify-center cursor-pointer"
        >
          Del
        </button>
      </div>

      {/* Footer info */}
      <div className="text-center">
        <p className="text-[11px] text-[#555] font-mono">
          Default Master PIN: <span className="text-[#888]">2025</span> (Configured in .env.local)
        </p>
        <div className="mt-4">
          <Link
            href="/"
            className="text-xs text-[#8A8A8A] hover:text-[#C9A84C] transition-colors underline underline-offset-4 font-mono"
          >
            ← Return to Public Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
