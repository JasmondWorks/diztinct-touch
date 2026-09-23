"use server";

import { isAdminAuthenticated } from "@/lib/auth-session";
import { UploadMediaResult, DeleteMediaResult } from "./media.types";
import { MediaService } from "./media.service";

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

    return await MediaService.optimizeAndUpload(inputBuffer, file.name, folder);
  } catch (err: any) {
    console.error("Upload failed in uploadProjectMediaAction:", err);
    return { success: false, error: err.message || "Failed to process and upload image." };
  }
}

export async function deleteProjectMediaAction(key: string): Promise<DeleteMediaResult> {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return { success: false, error: "Unauthorized." };
  }

  return await MediaService.delete(key);
}
