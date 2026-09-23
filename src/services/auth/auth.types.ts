export interface AuthResponse {
  success: boolean;
  accessToken?: string;
  error?: string;
}

export interface TokenPayload {
  sub: string;
  type: "access" | "refresh";
  role?: string;
  jti?: string;
  exp: number;
  iat: number;
}

export interface AdminAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
}
