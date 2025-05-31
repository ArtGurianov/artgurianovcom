import { CONTACT_BY } from "@prisma/client";
import { Messages } from "next-intl";
import { z } from "zod";

export const createStudioSchema = (t: (key: keyof Messages) => string) =>
  z.object({
    name: z.string().min(3, { message: t("string-too-short") }),
    contactBy: z.nativeEnum(CONTACT_BY, {
      message: t("incorrect-value"),
    }),
    contact: z.string().min(5, { message: t("string-too-short") }),
  });

export type StudioSchema = ReturnType<typeof createStudioSchema>;
