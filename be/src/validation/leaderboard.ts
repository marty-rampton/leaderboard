import { z } from "zod";

export const createLeaderboardSchema = z.object({
  limit: z
    .string()
    .optional()
    .transform(val => (val ? Number(val) : 10))
    .refine(val => Number.isInteger(val) && val > 0 && val <= 100, {
      message: "limit must be an integer between 1 and 100",
    }),
});