import { z } from "zod";
import { TranslateFn } from "./types";

export const createEmailSchema = (t: TranslateFn) =>
  z.object({
    email: z.string().email({ message: t("incorrect-email") }),
  });

export type EmailSchema = ReturnType<typeof createEmailSchema>;
