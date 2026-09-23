import sharp from "sharp";

export interface OptimizedImageResult {
  fullBuffer: Buffer;
  thumbBuffer: Buffer;
  contentType: string;
  originalSize: number;
  optimizedSize: number;
  thumbSize: number;
  savedPercentage: number;
}

/**
 * Optimizes an architectural render or photograph:
 * - Resizes large camera/render files to max 2048px width (retaining crisp line work and texture).
 * - Converts to modern WebP format at 82% quality (strips metadata, reduces size by 80-90%).
 * - Generates a 600px thumbnail for fast grid rendering.
 */
export async function optimizeArchitecturalImage(
  inputBuffer: Buffer
): Promise<OptimizedImageResult> {
  const originalSize = inputBuffer.length;

  // Process full-size display image (max 2048px wide/high)
  const fullBuffer = await sharp(inputBuffer)
    .rotate() // Auto-orient based on EXIF
    .resize({
      width: 2048,
      height: 2048,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: 82,
      effort: 4,
    })
    .toBuffer();

  // Process thumbnail image (max 600px wide/high)
  const thumbBuffer = await sharp(inputBuffer)
    .rotate()
    .resize({
      width: 600,
      height: 600,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: 78,
      effort: 3,
    })
    .toBuffer();

  const optimizedSize = fullBuffer.length;
  const thumbSize = thumbBuffer.length;
  const savedPercentage = Math.round(((originalSize - optimizedSize) / originalSize) * 100);

  return {
    fullBuffer,
    thumbBuffer,
    contentType: "image/webp",
    originalSize,
    optimizedSize,
    thumbSize,
    savedPercentage: Math.max(0, savedPercentage),
  };
}
