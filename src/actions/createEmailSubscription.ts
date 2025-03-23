"use server";

import { ActionResponse } from "@/lib/utils";
import { emailSchema } from "@/lib/schemas/emailSchema";
import { z } from "zod";
import db from "@/config/db";

export const createEmailSubscription = async ({
  email,
  fromRouteId,
  reCaptchaToken,
}: z.infer<typeof emailSchema> & {
  reCaptchaToken: string;
  fromRouteId: string | null;
}) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const googleResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${reCaptchaToken}`,
    { method: "POST" }
  );
  const googleResult = await googleResponse.json();

  if (!googleResult.success || googleResult.success < 0.5) {
    return new ActionResponse({
      success: false,
      errorMessage: "reCaptcha failed!",
    });
  }

  try {
    const alreadyExists = await db.emailSubscription.findUnique({
      where: { email },
    });

    if (alreadyExists) {
      return new ActionResponse({
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
    return new ActionResponse({
      success: true,
      data: created,
    });
  } catch {
    return new ActionResponse({
      success: false,
      errorMessage: "Error while saving data in the database.",
    });
  }
};
