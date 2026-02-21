-- Core schema for Cloudflare D1
-- Apply with: wrangler d1 execute <db-name> --file d1/schema.sql

CREATE TABLE IF NOT EXISTS "EmailSubscription" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "fromRouteId" TEXT NOT NULL,
  "device" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Application" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "applicationType" TEXT NOT NULL CHECK ("applicationType" IN ('MENTORSHIP', 'RECRUIT', 'STUDIO')),
  "name" TEXT NOT NULL,
  "codingLevel" TEXT CHECK ("codingLevel" IN ('NONE', 'SOME', 'GURU')),
  "entrepreneurLevel" TEXT CHECK ("entrepreneurLevel" IN ('NONE', 'SOME', 'GURU')),
  "contactBy" TEXT NOT NULL CHECK ("contactBy" IN ('EMAIL', 'PHONE', 'TG')),
  "contact" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "device" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS "EmailSubscription_email_key" ON "EmailSubscription"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "Application_applicationType_contactBy_contact_key" ON "Application"("applicationType", "contactBy", "contact");
