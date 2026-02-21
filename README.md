# artgurianovcom

Static-first Next.js frontend on Cloudflare Pages + separate Hono API Worker on Cloudflare Workers.

## Architecture

- Frontend: Next.js static export (`output: "export"`) deployed to Cloudflare Pages.
- API: `worker/` service for forms, D1 writes, reCAPTCHA validation, Bleadio notifications, and Contentful webhook handling.
- Database: Cloudflare D1 (`EmailSubscription`, `Application`).

## Frontend Local Development

```bash
pnpm install
pnpm dev
```

Required frontend env vars:

```bash
NEXT_PUBLIC_APP_LOCALE=en-US
NEXT_PUBLIC_API_URL=https://api.artgurianov.com
NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY=
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
```

## API Worker Local Development

```bash
pnpm --dir worker install
pnpm api:dev
```

Worker required secrets/vars:

- `RECAPTCHA_SECRET_KEY`
- `BLEADIO_URL`
- `BLEADIO_API_KEY`
- `CONTENTFUL_WEBHOOK_SECRET`
- `GITHUB_TOKEN`
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_DISPATCH_EVENT` (optional, defaults to `contentful-rebuild`)
- `ALLOWED_ORIGINS` (comma-separated origins)

## Prisma and D1 Migrations

Prisma is retained for schema/migration management:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:migrate:deploy
pnpm db:studio
```

Required migration env vars:

```bash
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_DATABASE_ID=
CLOUDFLARE_D1_TOKEN=
```

## Deployment

GitHub Actions workflow: `.github/workflows/deploy-cloudflare.yml`

- `push main` / `workflow_dispatch`: lint, deploy EN Pages, deploy RU Pages, deploy API Worker.
- `repository_dispatch` (`contentful-rebuild`): rebuild + deploy Pages only.

Required repository variables:

- `CF_PAGES_PROJECT_NAME_EN`
- `CF_PAGES_PROJECT_NAME_RU`

Required repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY`
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`
