import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "dt_admin_session";
const SECRET = process.env.ADMIN_PIN || "2025";

// Creates a simple HMAC token for the session
function createToken(): string {
  const payload = `admin_${Date.now()}`;
  const hmac = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${payload}.${hmac}`;
}

function verifyToken(token: string): boolean {
  try {
    if (!token || !token.includes(".")) return false;
    const [payload, hmac] = token.split(".");
    const expectedHmac = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
    const hmacBuf = Buffer.from(hmac);
    const expectedBuf = Buffer.from(expectedHmac);
    if (hmacBuf.length !== expectedBuf.length) return false;
    return crypto.timingSafeEqual(hmacBuf, expectedBuf);
  } catch {
    return false;
  }
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = createToken();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  if (!sessionCookie?.value) return false;
  return verifyToken(sessionCookie.value);
}
