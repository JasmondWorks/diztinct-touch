import { z } from "zod";

export const analyticsEventTypeSchema = z.enum([
  "page_view",
  "project_view",
  "whatsapp_click",
  "inquiry_submit",
]);

export const trackEventSchema = z.object({
  eventType: analyticsEventTypeSchema,
  path: z.string().min(1),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type TrackEventInput = z.infer<typeof trackEventSchema>;
