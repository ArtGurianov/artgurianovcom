"use server";

import { z } from "zod";
import { ActionResponse } from "@/lib/types/ActionResponse";
import { createActionResponse, getAppLocale } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import {
  createMentorshipSchema,
  MentorshipSchema,
} from "@/lib/schemas/mentorshipSchema";
import db from "@/config/db";

export const createMentorshipApplication = async ({
  name,
  codingLevel,
  entrepreneurLevel,
  contactBy,
  contact,
  reCaptchaToken,
}: z.infer<MentorshipSchema> & {
  reCaptchaToken: string;
}): Promise<ActionResponse> => {
  const locale = getAppLocale();
  const t = await getTranslations({
    locale,
    namespace: "FORM_ERRORS",
  });
  const mentorshipSchema = createMentorshipSchema(t);

  const validationResult = mentorshipSchema.safeParse({
    name,
    codingLevel,
    entrepreneurLevel,
    contactBy,
    contact,
  });
  if (!validationResult.success) {
    return createActionResponse({
      success: false,
      errorMessage: validationResult.error.errors[0].message,
    });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const googleResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${reCaptchaToken}`,
    { method: "POST" }
  );
  const googleResult = await googleResponse.json();

  if (!googleResult.success || googleResult.success < 0.5) {
    return createActionResponse({
      success: false,
      errorMessage: t("recaptcha-failed"),
    });
  }

  try {
    const alreadyExists = await db.mentorshipApplication.findUnique({
      where: {
        uniqueContact: {
          contact,
          contactBy,
        },
      },
    });

    if (alreadyExists) {
      return createActionResponse({
        success: false,
        errorMessage: t("already-exists"),
      });
    }

    const created = await db.mentorshipApplication.create({
      data: {
        name,
        codingLevel,
        entrepreneurLevel,
        contactBy,
        contact,
        locale,
      },
    });
    return createActionResponse({
      success: true,
      data: created,
    });
  } catch {
    return createActionResponse({
      success: false,
      errorMessage: t("db-catch"),
    });
  }
};
