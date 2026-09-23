import imageCompression from "browser-image-compression";

/**
 * Compresses an architectural render/photo in the browser before upload.
 * This guarantees the payload stays under server action body limits and speeds up uploads.
 */
export async function compressClientImage(file: File): Promise<File> {
  // If file is SVG or already smaller than 800KB, skip client compression
  if (file.type === "image/svg+xml" || file.size < 800 * 1024) {
    return file;
  }

  const options = {
    maxSizeMB: 1.5, // Target max 1.5MB for client transmission
    maxWidthOrHeight: 2560, // Keep 2.5K high architectural resolution
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.85,
  };

  try {
    const compressedBlob = await imageCompression(file, options);
    return new File([compressedBlob], file.name.replace(/\.[^/.]+$/, ".webp"), {
      type: "image/webp",
    });
  } catch (error) {
    console.warn("Client compression skipped/failed, uploading original:", error);
    return file;
  }
}
