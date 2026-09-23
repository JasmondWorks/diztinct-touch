"use server";

import {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
  getRefreshTokenFromCookie,
  isAdminAuthenticated,
} from "@/lib/auth-session";
import { verifyToken } from "@/lib/token-service";
import { redirect } from "next/navigation";
import { AuthResponse } from "./auth.types";
import { AuthService } from "./auth.service";

export async function verifyPinAction(pin: string): Promise<AuthResponse> {
  const isValid = AuthService.verifyPin(pin);
  if (!isValid) {
    return { success: false, error: "Incorrect security PIN. Please try again." };
  }

  try {
    const { refreshToken, jti, expiresAt, accessToken } = AuthService.issueTokens();
    await setRefreshTokenCookie(refreshToken);
    await AuthService.recordRefreshToken(jti, expiresAt);

    return { success: true, accessToken };
  } catch (err: any) {
    console.error("Error in verifyPinAction:", err);
    return { success: false, error: "Failed to establish secure session." };
  }
}

export async function refreshAccessTokenAction(): Promise<AuthResponse> {
  try {
    const refreshToken = await getRefreshTokenFromCookie();
    if (!refreshToken) {
      return { success: false, error: "No refresh token found." };
    }

    const { valid } = await AuthService.validateRefreshToken(refreshToken);
    if (!valid) {
      await clearRefreshTokenCookie();
      return { success: false, error: "Refresh token is expired, invalid, or revoked." };
    }

    const accessToken = AuthService.generateAccessToken();
    return { success: true, accessToken };
  } catch (err: any) {
    console.error("Error in refreshAccessTokenAction:", err);
    return { success: false, error: "Failed to refresh token." };
  }
}

export async function logoutAdminAction(): Promise<void> {
  try {
    const refreshToken = await getRefreshTokenFromCookie();
    if (refreshToken) {
      const payload = verifyToken(refreshToken, "refresh");
      if (payload?.jti) {
        await AuthService.revokeRefreshToken(payload.jti);
      }
    }
  } catch {
    // Ignore
  }

  await clearRefreshTokenCookie();
  redirect("/admin/login");
}

export async function checkAuthAction(): Promise<boolean> {
  return await isAdminAuthenticated();
}
