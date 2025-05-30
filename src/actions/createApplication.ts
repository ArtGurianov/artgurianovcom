"use server";

import db from "@/config/db";
import { ActionResponse } from "@/lib/types/ActionResponse";
import { createActionResponse, getAppLocale } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { createMentorshipSchema } from "@/lib/schemas/mentorshipSchema";
import { bleadio } from "@/config/bleadio";
import { createRecruitSchema } from "@/lib/schemas/recruitSchema";
import { z } from "zod";
import { Messages } from "next-intl";
import { APPLICATION_TYPE, CONTACT_BY } from "@prisma/client";

const SCHEMA_FACTORIES_MAP: Record<
  APPLICATION_TYPE,
  (_: (__: keyof Messages) => string) => z.Schema
> = {
  MENTORSHIP: createMentorshipSchema,
  RECRUIT: createRecruitSchema,
  STUDIO: createRecruitSchema,
};

export const createApplication = async <T>({
  reCaptchaToken,
  ...props
}: T & {
  name: string;
  contactBy: CONTACT_BY;
  contact: string;
  applicationType: APPLICATION_TYPE;
  reCaptchaToken: string;
}): Promise<ActionResponse> => {
  const { name, applicationType, contactBy, contact, ...rest } = props;

  const locale = getAppLocale();
  const t = await getTranslations({
    locale,
    namespace: "FORM_ERRORS",
  });
  const applicationSchema = SCHEMA_FACTORIES_MAP[applicationType](t);

  const validationResult = applicationSchema.safeParse(props);
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
    const alreadyExists = await db.application.findUnique({
      where: {
        uniqueContact: {
          applicationType,
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

    const created = await db.application.create({
      data: {
        name,
        applicationType,
        contactBy,
        contact,
        locale,
        ...rest,
      },
    });
    await bleadio({
      action: `New ${applicationType} Application`,
      name,
      contactBy,
      contact,
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
