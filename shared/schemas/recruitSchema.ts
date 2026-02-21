import { CONTACT_BY } from "../constants/prismaEnums";
import { z } from "zod";
import { TranslateFn } from "./types";

export const createRecruitSchema = (t: TranslateFn) =>
  z.object({
    name: z.string().min(3, { message: t("string-too-short") }),
    contactBy: z.nativeEnum(CONTACT_BY, {
      message: t("incorrect-value"),
    }),
    contact: z.string().min(5, { message: t("string-too-short") }),
  });

export type RecruitSchema = ReturnType<typeof createRecruitSchema>;
