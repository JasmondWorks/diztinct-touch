import { uploadToS3, deleteFromS3 } from "@/lib/s3";
import { optimizeArchitecturalImage } from "@/lib/image-optimizer";
import { UploadMediaResponseDto, DeleteMediaResponseDto } from "./media.dtos";

/**
 * MediaService
 * Backend domain service handling Sharp WebP image compression, Neon S3 storage uploads, and deletions
 */
export class MediaService {
  /**
   * Compress and upload an architectural image with high-definition WebP and thumbnail generation
   */
  static async optimizeAndUpload(
    inputBuffer: Buffer,
    originalFilename: string,
    folder: string = "projects"
  ): Promise<UploadMediaResponseDto> {
    try {
      const {
        fullBuffer,
        thumbBuffer,
        originalSize,
        optimizedSize,
        savedPercentage,
      } = await optimizeArchitecturalImage(inputBuffer);

      const timestamp = Date.now();
      const cleanName = originalFilename
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-");

      const fullKey = `${folder}/${cleanName}-${timestamp}.webp`;
      const thumbKey = `${folder}/${cleanName}-${timestamp}-thumb.webp`;

      const fullUpload = await uploadToS3(fullBuffer, fullKey, "image/webp");
      const thumbUpload = await uploadToS3(thumbBuffer, thumbKey, "image/webp");

      return {
        success: true,
        url: fullUpload.url,
        thumbUrl: thumbUpload.url,
        key: fullKey,
        originalSize,
        optimizedSize,
        savedPercentage,
      };
    } catch (err: any) {
      console.error("MediaService.optimizeAndUpload error:", err);
      return {
        success: false,
        error: err.message || "Failed to process and upload image.",
      };
    }
  }

  /**
   * Delete an image and its corresponding thumbnail from S3 storage
   */
  static async delete(key: string): Promise<DeleteMediaResponseDto> {
    try {
      await deleteFromS3(key);
      const thumbKey = key.replace(".webp", "-thumb.webp");
      await deleteFromS3(thumbKey);
      return { success: true };
    } catch (err: any) {
      console.error("MediaService.delete error:", err);
      return { success: false, error: err.message || "Failed to delete image." };
    }
  }
}
