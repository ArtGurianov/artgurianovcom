# Repository Guidelines

## Project Structure & Module Organization
- `src/app/`: Next.js App Router pages for static export.
- `src/components/`: UI and feature components, organized by feature (`CreationProjects`, `Navbar`, `Forms`, `common`, `ui`).
- `src/config/`: routing, SEO, Contentful, DB, and external integrations.
- `src/lib/`: shared hooks, schemas, types, and utilities (`cn()` in `src/lib/utils.ts`).
- `worker/`: Hono Cloudflare Worker API for forms, reCAPTCHA, D1 writes, and webhooks.
- `shared/`: shared enums/schemas/types consumed by frontend and worker.
- `messages/`: locale dictionaries (`en-US.json`, `ru-RU.json`); `d1/schema.sql`: D1 schema; `public/`: static assets.

## Build, Test, and Development Commands
- `pnpm dev`: start local dev server with experimental HTTPS (uses certs in `certificates/`).
- `pnpm build`: create a production build.
- `pnpm lint`: run ESLint (`next lint`).
- `pnpm api:dev`: run the API Worker locally (`worker/`).
- `pnpm api:deploy`: deploy the API Worker.
- `pnpm db:apply`: apply D1 schema SQL (`d1/schema.sql`).

## Coding Style & Naming Conventions
- Language: TypeScript (`strict: true`) with React/Next.js.
- Indentation: 2 spaces; keep imports grouped and use double quotes.
- Use path alias imports: `@/*` (example: `@/components/Navbar`).
- Naming: PascalCase for components/folders, `useXxx` for hooks, camelCase for variables/functions.
- Keep client/server boundaries explicit with `"use client"` and `"use server"`.
- Tailwind CSS v4 is used for styling; prefer utility classes and shared primitives from `src/components/ui/`.

## Testing Guidelines
- No automated test runner is currently configured.
- Minimum pre-PR checks: `pnpm lint` and `pnpm build` must pass.
- For UI or behavior changes, include manual verification notes (route tested, locale tested, mobile/desktop).
- If adding tests, use `*.test.ts` / `*.test.tsx` naming and colocate with the feature.

## Commit & Pull Request Guidelines
- Recent history favors short, lower-case commit subjects (example: `nav improved`, `styles fix`).
- Prefer concise, imperative commit messages scoped to one concern.
- PRs should include: purpose, key files/routes changed, screenshots for UI changes, and any env/DB impact.
- Link related issues/tasks and call out required reviewer setup steps.

## Security & Configuration Tips
- Start from `.env.example`; keep secrets only in local `.env`.
- Do not commit tokens or API keys (Contentful, reCAPTCHA, DB credentials).
- Validate locale-sensitive changes with `NEXT_PUBLIC_APP_LOCALE` before merge.
