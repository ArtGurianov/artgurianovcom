import { ApiApplicationInput, ApiSubscriptionInput } from "@shared/types/api";

export const subscriptionExists = async (db: D1Database, email: string) => {
  const existing = await db
    .prepare('SELECT "id" FROM "EmailSubscription" WHERE "email" = ?1 LIMIT 1')
    .bind(email)
    .first<{ id: string }>();

  return !!existing;
};

export const createSubscription = async (
  db: D1Database,
  payload: ApiSubscriptionInput,
  device: string | null
) => {
  const id = crypto.randomUUID();
  await db
    .prepare(
      'INSERT INTO "EmailSubscription" ("id", "email", "locale", "fromRouteId", "device", "createdAt", "updatedAt") VALUES (?1, ?2, ?3, ?4, ?5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)'
    )
    .bind(id, payload.email, payload.locale, payload.fromRouteId, device)
    .run();

  return { id };
};

export const applicationExists = async (
  db: D1Database,
  payload: ApiApplicationInput
) => {
  const existing = await db
    .prepare(
      'SELECT "id" FROM "Application" WHERE "applicationType" = ?1 AND "contactBy" = ?2 AND "contact" = ?3 LIMIT 1'
    )
    .bind(payload.applicationType, payload.contactBy, payload.contact)
    .first<{ id: string }>();

  return !!existing;
};

export const createApplication = async (
  db: D1Database,
  payload: ApiApplicationInput,
  device: string | null
) => {
  const id = crypto.randomUUID();
  await db
    .prepare(
      'INSERT INTO "Application" ("id", "applicationType", "name", "codingLevel", "entrepreneurLevel", "contactBy", "contact", "locale", "device", "createdAt", "updatedAt") VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)'
    )
    .bind(
      id,
      payload.applicationType,
      payload.name,
      "codingLevel" in payload ? payload.codingLevel : null,
      "entrepreneurLevel" in payload ? payload.entrepreneurLevel : null,
      payload.contactBy,
      payload.contact,
      payload.locale,
      device
    )
    .run();

  return { id };
};
