import { Hono } from "hono";
import { API_ERROR_CODES, apiSubscriptionSchema } from "@shared/types/api";
import { WorkerEnv } from "../env";
import { createSubscription, subscriptionExists } from "../lib/db";
import { sendBleadio } from "../lib/bleadio";
import { verifyReCaptcha } from "../lib/recaptcha";
import { fail, ok } from "../lib/http";
import { parseJsonBody } from "../lib/request";

export const subscriptionsRouter = new Hono<{ Bindings: WorkerEnv }>();

subscriptionsRouter.post("/", async (c) => {
  const body = await parseJsonBody<unknown>(c, "create_subscription");
  const parsed = apiSubscriptionSchema.safeParse(body);
  if (!parsed.success) {
    return fail(c, API_ERROR_CODES.INVALID_PAYLOAD);
  }

  const isHuman = await verifyReCaptcha(c.env, parsed.data.reCaptchaToken);
  if (!isHuman) {
    return fail(c, API_ERROR_CODES.RECAPTCHA_FAILED);
  }

  try {
    const exists = await subscriptionExists(c.env.DB, parsed.data.email);
    if (exists) {
      return fail(c, API_ERROR_CODES.ALREADY_EXISTS, 409);
    }

    const device = c.req.header("User-Agent") || null;
    const created = await createSubscription(c.env.DB, parsed.data, device);
    await sendBleadio(c.env.BLEADIO_URL, c.env.BLEADIO_API_KEY, {
      action: "New Subscription",
      email: parsed.data.email,
    });

    return ok(c, created);
  } catch {
    return fail(c, API_ERROR_CODES.DB_ERROR, 500);
  }
});
