import { z } from "zod";
import {
  APPLICATION_TYPE,
  CONTACT_BY,
  EXPERIENCE_LEVEL,
} from "../constants/dbEnums";
import { createEmailSchema } from "../schemas/emailSchema";
import { createMentorshipSchema } from "../schemas/mentorshipSchema";
import { createRecruitSchema } from "../schemas/recruitSchema";
import { createStudioSchema } from "../schemas/studioSchema";

export const API_ERROR_CODES = {
  INVALID_PAYLOAD: "invalid_payload",
  RECAPTCHA_FAILED: "recaptcha_failed",
  ALREADY_EXISTS: "already_exists",
  DB_ERROR: "db_error",
  UNAUTHORIZED: "unauthorized",
  UPSTREAM_ERROR: "upstream_error",
  UNKNOWN: "unknown",
} as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];

export interface ApiResponse<T = null> {
  success: boolean;
  data: T | null;
  errorCode: ApiErrorCode | null;
}

export const APP_LOCALES = ["en-US", "ru-RU"] as const;
const localeSchema = z.enum(APP_LOCALES);
const t = (key: string) => key;

export const apiSubscriptionSchema = createEmailSchema(t).extend({
  fromRouteId: z.string().min(1),
  locale: localeSchema,
  reCaptchaToken: z.string().min(1),
});

export type ApiSubscriptionInput = z.infer<typeof apiSubscriptionSchema>;

export const apiRecruitApplicationSchema = createRecruitSchema(t).extend({
  applicationType: z.literal(APPLICATION_TYPE.RECRUIT),
  locale: localeSchema,
  reCaptchaToken: z.string().min(1),
});

export const apiStudioApplicationSchema = createStudioSchema(t).extend({
  applicationType: z.literal(APPLICATION_TYPE.STUDIO),
  locale: localeSchema,
  reCaptchaToken: z.string().min(1),
});

export const apiMentorshipApplicationSchema = createMentorshipSchema(t).extend({
  applicationType: z.literal(APPLICATION_TYPE.MENTORSHIP),
  codingLevel: z.nativeEnum(EXPERIENCE_LEVEL),
  entrepreneurLevel: z.nativeEnum(EXPERIENCE_LEVEL),
  contactBy: z.nativeEnum(CONTACT_BY),
  locale: localeSchema,
  reCaptchaToken: z.string().min(1),
});

export const apiApplicationSchema = z.discriminatedUnion("applicationType", [
  apiMentorshipApplicationSchema,
  apiRecruitApplicationSchema,
  apiStudioApplicationSchema,
]);

export type ApiApplicationInput = z.infer<typeof apiApplicationSchema>;
