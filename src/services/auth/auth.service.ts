import { prisma } from "@/lib/prisma";
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from "@/lib/token-service";

/**
 * AuthService
 * Domain service managing PIN validation, cryptographic token issuance, and session revocation
 */
export class AuthService {
  /**
   * Verify provided master PIN against environment secret
   */
  static verifyPin(pin: string): boolean {
    const correctPin = process.env.ADMIN_PIN || "2025";
    return Boolean(pin && pin.trim() === correctPin.trim());
  }

  /**
   * Issue a new refresh/access token pair for authenticated session
   */
  static issueTokens() {
    const { token: refreshToken, jti, expiresAt } = createRefreshToken();
    const accessToken = createAccessToken();

    return {
      refreshToken,
      jti,
      expiresAt,
      accessToken,
    };
  }

  /**
   * Record refresh token JTI in database
   */
  static async recordRefreshToken(jti: string, expiresAt: Date): Promise<void> {
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
  }

  /**
   * Check if a refresh token is valid and unrevoked
   */
  static async validateRefreshToken(token: string): Promise<{ valid: boolean; jti?: string }> {
    const payload = verifyToken(token, "refresh");
    if (!payload) {
      return { valid: false };
    }

    if (payload.jti) {
      try {
        const recorded = await prisma.refreshToken.findUnique({
          where: { tokenHash: payload.jti },
        });
        if (recorded?.revoked) {
          return { valid: false, jti: payload.jti };
        }
      } catch {
        // Fall back gracefully if DB transiently fails
      }
    }

    return { valid: true, jti: payload.jti };
  }

  /**
   * Revoke an active refresh token in database
   */
  static async revokeRefreshToken(jti: string): Promise<void> {
    try {
      await prisma.refreshToken.update({
        where: { tokenHash: jti },
        data: { revoked: true },
      });
    } catch {
      // Ignore if record not found
    }
  }

  /**
   * Generate a fresh access token
   */
  static generateAccessToken(): string {
    return createAccessToken();
  }
}
