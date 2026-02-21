import { Hono } from "hono";
import { cors } from "hono/cors";
import { WorkerEnv } from "./env";
import { applicationsRouter } from "./routes/applications";
import { contentfulWebhookRouter } from "./routes/contentful-webhook";
import { subscriptionsRouter } from "./routes/subscriptions";

const app = new Hono<{ Bindings: WorkerEnv }>();

app.use("*", async (c, next) => {
  const allowedOrigins = c.env.ALLOWED_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return cors({
    origin: (origin) => {
      if (!origin) {
        return allowedOrigins[0] || "";
      }

      return allowedOrigins.includes(origin) ? origin : "";
    },
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "x-contentful-webhook-secret"],
  })(c, next);
});

app.get("/healthz", (c) =>
  c.json({
    ok: true,
    now: Date.now(),
  })
);

app.route("/v1/applications", applicationsRouter);
app.route("/v1/subscriptions", subscriptionsRouter);
app.route("/webhooks/contentful", contentfulWebhookRouter);

export default app;
