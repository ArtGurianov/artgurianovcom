"use server";

import { emailSchema } from "@/lib/schemas/emailSchema";
import { z } from "zod";
import { ActionResponse } from "@/lib/types/ActionResponse";
import { createActionResponse } from "@/lib/utils";
import db from "@/config/db";

export const createEmailSubscription = async ({
  email,
  fromRouteId,
  reCaptchaToken,
}: z.infer<typeof emailSchema> & {
  reCaptchaToken: string;
  fromRouteId: string | null;
}): Promise<ActionResponse> => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const googleResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${reCaptchaToken}`,
    { method: "POST" }
  );
  const googleResult = await googleResponse.json();

  if (!googleResult.success || googleResult.success < 0.5) {
    return createActionResponse({
      success: false,
      errorMessage: "reCaptcha failed!",
    });
  }

  try {
    const alreadyExists = await db.emailSubscription.findUnique({
      where: { email },
    });

    if (alreadyExists) {
      return createActionResponse({
        success: false,
        errorMessage: "Already subscribed.",
      });
    }

    const created = await db.emailSubscription.create({
      data: {
        email,
        fromRouteId,
      },
    });
    return createActionResponse({
      success: true,
      data: created,
    });
  } catch {
    return createActionResponse({
      success: false,
      errorMessage: "Error while saving data in the database.",
    });
  }
};
