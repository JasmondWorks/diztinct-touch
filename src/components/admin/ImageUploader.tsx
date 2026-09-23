"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { uploadProjectMediaAction } from "@/actions/upload";
import { compressClientImage } from "@/lib/client-compress";
import { Upload, X, Loader2, Sparkles, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  label: string;
  sublabel?: string;
  initialUrl?: string;
  folder?: string;
  onUploadComplete: (url: string, thumbUrl?: string) => void;
  className?: string;
}

export function ImageUploader({
  label,
  sublabel = "Optimized with sharp into progressive WebP for Neon Storage",
  initialUrl,
  folder = "projects",
  onUploadComplete,
  className,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(initialUrl || null);
  const [uploading, setUploading] = useState(false);
  const [stats, setStats] = useState<{
    originalKb: number;
    optimizedKb: number;
    savedPercent: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      // 1. Client-side pre-compression
      const readyFile = await compressClientImage(file);

      // 2. Server Action upload + Sharp optimization
      const formData = new FormData();
      formData.append("file", readyFile);
      formData.append("folder", folder);

      const res = await uploadProjectMediaAction(formData);

      if (res.success && res.url) {
        setPreview(res.url);
        onUploadComplete(res.url, res.thumbUrl);

        if (res.originalSize && res.optimizedSize) {
          setStats({
            originalKb: Math.round(res.originalSize / 1024),
            optimizedKb: Math.round(res.optimizedSize / 1024),
            savedPercent: res.savedPercentage || 0,
          });
        }
      } else {
        setError(res.error || "Upload failed");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during upload");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setStats(null);
    onUploadComplete("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-bold uppercase text-foreground">
          {label}
        </label>
        {stats && (
          <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
            <Sparkles className="h-3 w-3" />
            <span>
              {stats.originalKb}KB ➔ {stats.optimizedKb}KB ({stats.savedPercent}% saved)
            </span>
          </span>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative group aspect-16/10 w-full overflow-hidden rounded-2xl border border-border bg-muted/40">
          <Image
            src={preview}
            alt="Uploaded Preview"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-xl bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-background"
            >
              Replace Image
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="rounded-xl bg-destructive px-3 py-1.5 text-xs font-semibold text-white hover:bg-destructive/90"
            >
              <X className="h-3.5 w-3.5 inline mr-1" />
              Remove
            </button>
          </div>
          <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-mono text-white flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            <span>Stored in Neon S3 (WebP)</span>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border p-6 text-center transition-all cursor-pointer hover:border-primary/50 hover:bg-muted/30",
            uploading && "opacity-60 cursor-not-allowed"
          )}
        >
          {uploading ? (
            <div className="space-y-2 flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-xs font-semibold text-foreground">
                Optimizing &amp; Uploading to Neon S3...
              </p>
              <p className="text-[10px] text-muted-foreground font-mono">
                Compressing to progressive WebP (82% quality)
              </p>
            </div>
          ) : (
            <div className="space-y-2 flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Upload className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-foreground">
                Click to browse or drag &amp; drop architectural render
              </p>
              <p className="text-[11px] text-muted-foreground">
                {sublabel}
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-destructive font-mono">{error}</p>
      )}
    </div>
  );
}
