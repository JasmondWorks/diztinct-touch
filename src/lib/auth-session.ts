import { cookies } from "next/headers";
import { verifyToken, TokenPayload } from "./token-service";

export const REFRESH_COOKIE_NAME = "dt_refresh_token";

export async function setRefreshTokenCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(REFRESH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getRefreshTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(REFRESH_COOKIE_NAME);
  return cookie?.value || null;
}

export async function clearRefreshTokenCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(REFRESH_COOKIE_NAME);
}

export async function getVerifiedAdminSession(): Promise<TokenPayload | null> {
  const token = await getRefreshTokenFromCookie();
  if (!token) return null;
  return verifyToken(token, "refresh");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await getVerifiedAdminSession();
  return session !== null;
}
