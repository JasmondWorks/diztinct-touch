/**
 * Data Transfer Objects (DTOs) for Auth Service Module
 */

export interface VerifyPinDto {
  pin: string;
}

export interface AuthResponseDto {
  success: boolean;
  accessToken?: string;
  error?: string;
}

export interface SessionStateDto {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
}

export interface TokenPayloadDto {
  sub: string;
  type: "access" | "refresh";
  role?: string;
  jti?: string;
  exp: number;
  iat: number;
}
