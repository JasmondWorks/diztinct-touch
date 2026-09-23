export interface UploadMediaResult {
  success: boolean;
  url?: string;
  thumbUrl?: string;
  key?: string;
  originalSize?: number;
  optimizedSize?: number;
  savedPercentage?: number;
  error?: string;
}

export interface DeleteMediaResult {
  success: boolean;
  error?: string;
}

export interface MediaUploadOptions {
  folder?: string;
  maxWidth?: number;
  quality?: number;
}
