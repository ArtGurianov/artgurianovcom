import { Hono } from "hono";
import { API_ERROR_CODES } from "@shared/types/api";
import { WorkerEnv } from "../env";
import { dispatchContentRebuild } from "../lib/github";
import { fail, ok } from "../lib/http";
import { parseJsonBody } from "../lib/request";

const SUPPORTED_CONTENT_TYPES = ["project", "wisdomOffering", "publication"];

export const contentfulWebhookRouter = new Hono<{ Bindings: WorkerEnv }>();

contentfulWebhookRouter.post("/", async (c) => {
  const headerSecret = c.req.header("x-contentful-webhook-secret");
  if (!headerSecret || headerSecret !== c.env.CONTENTFUL_WEBHOOK_SECRET) {
    return fail(c, API_ERROR_CODES.UNAUTHORIZED, 401);
  }

  const body = await parseJsonBody<{
    sys?: { contentType?: { sys?: { id?: string } } };
  }>(c, "contentful_webhook");
  const contentType = body?.sys?.contentType?.sys?.id;

  if (!contentType || !SUPPORTED_CONTENT_TYPES.includes(contentType)) {
    return fail(c, API_ERROR_CODES.INVALID_PAYLOAD);
  }

  try {
    await dispatchContentRebuild(c.env, { contentType });
    return ok(c, { accepted: true, contentType });
  } catch {
    return fail(c, API_ERROR_CODES.UPSTREAM_ERROR, 502);
  }
});
