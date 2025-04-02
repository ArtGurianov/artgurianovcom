import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email({ message: "Should be valid email tho" }),
});
