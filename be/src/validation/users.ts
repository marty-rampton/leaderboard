import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(32, "Username must be at most 32 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
});
