import { z } from "zod";

export const uploadMediaOptionsSchema = z.object({
  folder: z.string().default("projects"),
  maxWidth: z.number().int().positive().default(2048),
  quality: z.number().int().min(1).max(100).default(82),
});

export const deleteMediaSchema = z.object({
  key: z.string().min(1, "Media storage key is required"),
});

export type UploadMediaOptions = z.infer<typeof uploadMediaOptionsSchema>;
export type DeleteMediaInput = z.infer<typeof deleteMediaSchema>;
