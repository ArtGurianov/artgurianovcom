import { Messages } from "next-intl";
import { z } from "zod";

export const createEmailSchema = (t: (key: keyof Messages) => string) =>
  z.object({
    email: z.string().email({ message: t("incorrect-email") }),
  });
export type EmailSchema = ReturnType<typeof createEmailSchema>;
