import { z } from "zod";

type TranslateFn = (key: string) => string;

export const createEmailSchema = (t: TranslateFn) =>
  z.object({
    email: z.string().email({ message: t("incorrect-email") }),
  });

export type EmailSchema = ReturnType<typeof createEmailSchema>;
