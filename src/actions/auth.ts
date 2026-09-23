"use server";

import { setAdminSession, clearAdminSession, isAdminAuthenticated } from "@/lib/auth-session";
import { redirect } from "next/navigation";

export async function verifyPinAction(pin: string): Promise<{ success: boolean; error?: string }> {
  const correctPin = process.env.ADMIN_PIN || "2025";
  if (!pin || pin.trim() !== correctPin.trim()) {
    return { success: false, error: "Incorrect security PIN. Please try again." };
  }

  await setAdminSession();
  return { success: true };
}

export async function logoutAdminAction(): Promise<void> {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function checkAuthAction(): Promise<boolean> {
  return await isAdminAuthenticated();
}
