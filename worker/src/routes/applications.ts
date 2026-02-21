import { Hono } from "hono";
import { API_ERROR_CODES, apiApplicationSchema } from "@shared/types/api";
import { WorkerEnv } from "../env";
import { applicationExists, createApplication } from "../lib/db";
import { sendBleadio } from "../lib/bleadio";
import { verifyReCaptcha } from "../lib/recaptcha";
import { fail, ok } from "../lib/http";
import { parseJsonBody } from "../lib/request";

export const applicationsRouter = new Hono<{ Bindings: WorkerEnv }>();

applicationsRouter.post("/", async (c) => {
  const body = await parseJsonBody<unknown>(c, "create_application");
  const parsed = apiApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return fail(c, API_ERROR_CODES.INVALID_PAYLOAD);
  }

  const isHuman = await verifyReCaptcha(c.env, parsed.data.reCaptchaToken);
  if (!isHuman) {
    return fail(c, API_ERROR_CODES.RECAPTCHA_FAILED);
  }

  try {
    const exists = await applicationExists(c.env.DB, parsed.data);
    if (exists) {
      return fail(c, API_ERROR_CODES.ALREADY_EXISTS, 409);
    }

    const device = c.req.header("User-Agent") || null;
    const created = await createApplication(c.env.DB, parsed.data, device);

    await sendBleadio(c.env.BLEADIO_URL, c.env.BLEADIO_API_KEY, {
      action: `New ${parsed.data.applicationType} Application`,
      name: parsed.data.name,
      contactBy: parsed.data.contactBy,
      contact: parsed.data.contact,
    });

    return ok(c, created);
  } catch {
    return fail(c, API_ERROR_CODES.DB_ERROR, 500);
  }
});
