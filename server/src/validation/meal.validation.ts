import { z } from "zod";

export const createMealSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .max(120, "Name must be 120 characters or fewer"),
    description: z
      .string()
      .trim()
      .max(500, "Description must be 500 characters or fewer")
      .optional(),
    tags: z
      .array(
        z
          .string()
          .trim()
          .min(1, "Tags cannot be empty")
          .max(40, "Tags must be 40 characters or fewer"),
      )
      .max(20, "A meal can have at most 20 tags")
      .optional(),
  })
  .strict();

export type CreateMealInput = z.infer<typeof createMealSchema>;
