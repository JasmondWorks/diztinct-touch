/**
 * Data Transfer Objects (DTOs) for Media Service Module
 */

export interface UploadMediaDto {
  buffer: Buffer;
  filename: string;
  folder?: string;
  contentType?: string;
}

export interface UploadMediaResponseDto {
  success: boolean;
  url?: string;
  thumbUrl?: string;
  key?: string;
  originalSize?: number;
  optimizedSize?: number;
  savedPercentage?: number;
  error?: string;
}

export interface DeleteMediaDto {
  key: string;
}

export interface DeleteMediaResponseDto {
  success: boolean;
  error?: string;
}
