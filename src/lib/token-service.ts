import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || process.env.ADMIN_PIN || "2025-diztinct-touch-secure-secret";

export interface TokenPayload {
  sub: string;
  type: "access" | "refresh";
  role?: string;
  jti?: string;
  exp: number; // epoch ms
  iat: number;
}

function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString("utf-8");
}

function sign(header: object, payload: object): string {
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const data = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(data)
    .digest("base64url");
  return `${data}.${signature}`;
}

export function createAccessToken(): string {
  const header = { alg: "HS256", typ: "JWT" };
  const payload: TokenPayload = {
    sub: "admin",
    role: "architect",
    type: "access",
    iat: Date.now(),
    exp: Date.now() + 15 * 60 * 1000, // 15 minutes
  };
  return sign(header, payload);
}

export function createRefreshToken(): { token: string; jti: string; expiresAt: Date } {
  const header = { alg: "HS256", typ: "JWT" };
  const jti = crypto.randomUUID();
  const expiresMs = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const payload: TokenPayload = {
    sub: "admin",
    type: "refresh",
    jti,
    iat: Date.now(),
    exp: expiresMs,
  };
  return {
    token: sign(header, payload),
    jti,
    expiresAt: new Date(expiresMs),
  };
}

export function verifyToken(token: string, expectedType: "access" | "refresh"): TokenPayload | null {
  try {
    if (!token || typeof token !== "string") return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signature] = parts;
    const data = `${headerB64}.${payloadB64}`;

    const expectedSig = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(data)
      .digest("base64url");

    const sigBuf = Buffer.from(signature);
    const expectedBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expectedBuf.length) return null;
    if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return null;

    const payload: TokenPayload = JSON.parse(base64UrlDecode(payloadB64));

    // Verify type
    if (payload.type !== expectedType) return null;

    // Verify expiration
    if (Date.now() > payload.exp) return null;

    return payload;
  } catch {
    return null;
  }
}
