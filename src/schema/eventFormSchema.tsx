import { z } from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3).max(20),
  description: z.string().min(10).max(50).optional(),
  start: z.date(),
  end: z.date(),
  isImportant: z.string(),
  isPersonal: z.number(),
  users: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
      })
    )
    .min(0)
    .max(5, { message: "Only 5 guests are Allowed" })
    .optional(),
});
