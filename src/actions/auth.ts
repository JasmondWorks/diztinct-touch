"use server";

import {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
  getRefreshTokenFromCookie,
  isAdminAuthenticated,
} from "@/lib/auth-session";
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from "@/lib/token-service";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export interface AuthResponse {
  success: boolean;
  accessToken?: string;
  error?: string;
}

export async function verifyPinAction(pin: string): Promise<AuthResponse> {
  const correctPin = process.env.ADMIN_PIN || "2025";
  if (!pin || pin.trim() !== correctPin.trim()) {
    return { success: false, error: "Incorrect security PIN. Please try again." };
  }

  try {
    // 1. Generate long-lived refresh token
    const { token: refreshToken, jti, expiresAt } = createRefreshToken();

    // 2. Set HttpOnly secure cookie for refresh token
    await setRefreshTokenCookie(refreshToken);

    // 3. Save refresh token metadata to database
    try {
      await prisma.refreshToken.create({
        data: {
          tokenHash: jti,
          expiresAt,
          revoked: false,
        },
      });
    } catch (e) {
      console.warn("Could not record refresh token in DB, continuing:", e);
    }

    // 4. Generate short-lived (15 min) access token to return to memory
    const accessToken = createAccessToken();

    return { success: true, accessToken };
  } catch (err: any) {
    console.error("Error in verifyPinAction:", err);
    return { success: false, error: "Failed to establish secure session." };
  }
}

/**
 * Called on page load/reload/tab open by the client AuthProvider.
 * Verifies the HttpOnly refresh token cookie and issues a fresh in-memory access token.
 */
export async function refreshAccessTokenAction(): Promise<AuthResponse> {
  try {
    const refreshToken = await getRefreshTokenFromCookie();
    if (!refreshToken) {
      return { success: false, error: "No refresh token found." };
    }

    const payload = verifyToken(refreshToken, "refresh");
    if (!payload) {
      await clearRefreshTokenCookie();
      return { success: false, error: "Refresh token is expired or invalid." };
    }

    // Check if token was revoked in database
    if (payload.jti) {
      try {
        const recorded = await prisma.refreshToken.findUnique({
          where: { tokenHash: payload.jti },
        });
        if (recorded?.revoked) {
          await clearRefreshTokenCookie();
          return { success: false, error: "Session has been revoked." };
        }
      } catch (e) {
        // Fall back gracefully if DB check has a glitch
      }
    }

    // Issue fresh access token for client memory
    const accessToken = createAccessToken();

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
        try {
          await prisma.refreshToken.update({
            where: { tokenHash: payload.jti },
            data: { revoked: true },
          });
        } catch {
          // Ignore
        }
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
