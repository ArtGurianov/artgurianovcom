"use server";

import { emailSchema } from "@/lib/schemas/emailSchema";
import { z } from "zod";
import { ActionResponse } from "@/lib/types/ActionResponse";
import { createActionResponse, getAppLocale } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import db from "@/config/db";

export const createEmailSubscription = async ({
  email,
  fromRouteId,
  reCaptchaToken,
}: z.infer<typeof emailSchema> & {
  reCaptchaToken: string;
  fromRouteId: string;
}): Promise<ActionResponse> => {
  const locale = getAppLocale();
  const t = await getTranslations({ locale, namespace: "WIP_PAGE_FORM" });

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
    const alreadyExists = await db.emailSubscription.findUnique({
      where: { email },
    });

    if (alreadyExists) {
      return createActionResponse({
        success: false,
        errorMessage: t("errors.already-exists"),
      });
    }

    const created = await db.emailSubscription.create({
      data: {
        email,
        fromRouteId,
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
