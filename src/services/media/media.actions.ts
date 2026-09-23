"use server";

import { isAdminAuthenticated } from "@/lib/auth-session";
import { uploadToS3, deleteFromS3 } from "@/lib/s3";
import { optimizeArchitecturalImage } from "@/lib/image-optimizer";
import { UploadMediaResult, DeleteMediaResult } from "./media.types";

export async function uploadProjectMediaAction(formData: FormData): Promise<UploadMediaResult> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: "Unauthorized. Admin PIN required." };
  }

  const file = formData.get("file") as File;
  const folder = (formData.get("folder") as string) || "projects";

  if (!file || file.size === 0) {
    return { success: false, error: "No valid image file provided." };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Optimize with sharp (convert to WebP, resize max 2048px, generate thumbnail)
    const {
      fullBuffer,
      thumbBuffer,
      originalSize,
      optimizedSize,
      savedPercentage,
    } = await optimizeArchitecturalImage(inputBuffer);

    const timestamp = Date.now();
    const cleanName = file.name
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
    console.error("Upload failed via Prisma/S3 media service:", err);
    return { success: false, error: err.message || "Failed to process and upload image." };
  }
}

export async function deleteProjectMediaAction(key: string): Promise<DeleteMediaResult> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    await deleteFromS3(key);
    const thumbKey = key.replace(".webp", "-thumb.webp");
    await deleteFromS3(thumbKey);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
