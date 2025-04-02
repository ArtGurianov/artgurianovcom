import { CONTACT_BY, EXPERIENCE_LEVEL } from "@prisma/client";
import { z } from "zod";

export const mentorshipSchema = z.object({
  name: z.string(),
  codingLevel: z.nativeEnum(EXPERIENCE_LEVEL),
  entrepreneurLevel: z.nativeEnum(EXPERIENCE_LEVEL),
  contactBy: z.nativeEnum(CONTACT_BY),
  contact: z.string(),
});
