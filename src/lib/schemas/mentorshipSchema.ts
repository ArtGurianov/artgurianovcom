import { CONTACT_BY, EXPERIENCE_LEVEL } from "@prisma/client";
import { Messages } from "next-intl";
import { z } from "zod";

export const createMentorshipSchema = (t: (key: keyof Messages) => string) =>
  z.object({
    name: z.string().min(3, { message: t("string-too-short") }),
    codingLevel: z.nativeEnum(EXPERIENCE_LEVEL, {
      message: t("incorrect-value"),
    }),
    entrepreneurLevel: z.nativeEnum(EXPERIENCE_LEVEL, {
      message: t("incorrect-value"),
    }),
    contactBy: z.nativeEnum(CONTACT_BY, {
      message: t("incorrect-value"),
    }),
    contact: z.string().min(5, { message: t("string-too-short") }),
  });

export type MentorshipSchema = ReturnType<typeof createMentorshipSchema>;
