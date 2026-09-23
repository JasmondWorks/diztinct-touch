import { z } from "zod";

export const pinSchema = z
  .string()
  .min(4, "PIN must be 4 digits")
  .max(4, "PIN must be 4 digits")
  .regex(/^\d{4}$/, "PIN must be numeric digits only");

export const verifyPinSchema = z.object({
  pin: pinSchema,
});

export type VerifyPinInput = z.infer<typeof verifyPinSchema>;
