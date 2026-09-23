"use client";

import { useState, useTransition } from "react";
import { uploadProjectMediaAction, deleteProjectMediaAction } from "./media.actions";
import { UploadMediaResult } from "./media.types";
import { compressClientImage } from "@/lib/client-compress";

export function useMediaUpload() {
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const uploadFile = async (
    file: File,
    folder: string = "projects"
  ): Promise<UploadMediaResult> => {
    setUploading(true);
    setError("");
    setProgress("Compressing image client-side...");

    try {
      const compressed = await compressClientImage(file);
      setProgress("Uploading & optimizing with Sharp WebP pipeline...");

      const formData = new FormData();
      formData.append("file", compressed);
      formData.append("folder", folder);

      const res = await uploadProjectMediaAction(formData);

      if (!res.success) {
        setError(res.error || "Upload failed");
      }
      return res;
    } catch (err: any) {
      const msg = err?.message || "Failed to process media file";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setUploading(false);
      setProgress("");
    }
  };

  const removeFile = async (key: string) => {
    return await deleteProjectMediaAction(key);
  };

  return {
    uploadFile,
    removeFile,
    uploading: uploading || isPending,
    progress,
    error,
  };
}
