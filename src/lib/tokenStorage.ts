/**
 * In-memory client storage for short-lived Access Tokens.
 * Never writes to localStorage or sessionStorage.
 * On page load, reload, or new tab, the Access Token is regenerated
 * via silent refresh from the HttpOnly secure refresh token cookie.
 */
let inMemoryAccessToken: string | null = null;

export const tokenStorage = {
  getAccessToken(): string | null {
    return inMemoryAccessToken;
  },

  setAccessToken(token: string | null): void {
    inMemoryAccessToken = token;
  },

  clearAccessToken(): void {
    inMemoryAccessToken = null;
  },

  hasToken(): boolean {
    return Boolean(inMemoryAccessToken);
  },
};
