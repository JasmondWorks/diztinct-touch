import React from "react";
import type { Metadata } from "next";
import { AdminLoginKeypad } from "@/components/admin/AdminLoginKeypad";

export const metadata: Metadata = {
  title: "Admin Portal Access | DIZTINCT TOUCH HOME DESIGN",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F9F6F0] flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-[#C9A84C]/30">
      {/* Subtle architectural grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Ambient gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Interactive Tactile Keypad */}
      <AdminLoginKeypad />
    </div>
  );
}
