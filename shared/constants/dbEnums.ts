export const CONTACT_BY = {
  EMAIL: "EMAIL",
  PHONE: "PHONE",
  TG: "TG",
} as const;

export type CONTACT_BY = (typeof CONTACT_BY)[keyof typeof CONTACT_BY];

export const EXPERIENCE_LEVEL = {
  NONE: "NONE",
  SOME: "SOME",
  GURU: "GURU",
} as const;

export type EXPERIENCE_LEVEL =
  (typeof EXPERIENCE_LEVEL)[keyof typeof EXPERIENCE_LEVEL];

export const APPLICATION_TYPE = {
  MENTORSHIP: "MENTORSHIP",
  RECRUIT: "RECRUIT",
  STUDIO: "STUDIO",
} as const;

export type APPLICATION_TYPE =
  (typeof APPLICATION_TYPE)[keyof typeof APPLICATION_TYPE];
