"use server";

import { z } from "zod";
import { ActionResponse } from "@/lib/types/ActionResponse";
import { createActionResponse, getAppLocale } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { mentorshipSchema } from "@/lib/schemas/mentorshipSchema";
import db from "@/config/db";

export const createMentorshipApplication = async ({
  name,
  codingLevel,
  entrepreneurLevel,
  contactBy,
  contact,
  reCaptchaToken,
}: z.infer<typeof mentorshipSchema> & {
  reCaptchaToken: string;
}): Promise<ActionResponse> => {
  const locale = getAppLocale();
  const t = await getTranslations({
    locale,
    namespace: "MENTORSHIP_APPLICATION_FORM",
  });

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const googleResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${reCaptchaToken}`,
    { method: "POST" }
  );
  const googleResult = await googleResponse.json();

  if (!googleResult.success || googleResult.success < 0.5) {
    return createActionResponse({
      success: false,
      errorMessage: t("errors.recaptcha-failed"),
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
        errorMessage: t("errors.already-exists"),
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
      errorMessage: t("errors.db-catch"),
    });
  }
};
