import { z } from "zod";

export const createScoreSchema = z.object({
  userId: z
    .number()
    .int("userId must be an integer")
    .positive("userId must be positive"),

  score: z
    .number()
    .int("score must be an integer")
    .min(0, "score cannot be negative")
    .max(1000000000, "score is too large"),
});
