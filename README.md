# artgurianovcom

Next.js app deployed to Cloudflare Workers via OpenNext.

## Local Development

```bash
pnpm install
pnpm dev
```

## Database (Prisma + D1)

This project keeps Prisma and uses Cloudflare D1 with `@prisma/adapter-d1`.

Required env vars for Prisma D1 migrations:

```bash
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_DATABASE_ID=
CLOUDFLARE_D1_TOKEN=
```

Common commands:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:migrate:deploy
pnpm db:studio
```

## Cloudflare Setup

Create infrastructure:

```bash
pnpm wrangler d1 create artgurianovcom-db
pnpm wrangler d1 create next-tag-cache
pnpm wrangler kv namespace create NEXT_INC_CACHE_KV
```

Put returned IDs into `wrangler.jsonc`:

- `d1_databases[0].database_id` for `DB`
- `d1_databases[1].database_id` for `NEXT_TAG_CACHE_D1`
- `kv_namespaces[0].id` for `NEXT_INC_CACHE_KV`

Use two distinct D1 database IDs for `DB` and `NEXT_TAG_CACHE_D1`.

Set secrets:

```bash
pnpm wrangler secret put RECAPTCHA_SECRET_KEY
pnpm wrangler secret put CONTENTFUL_SPACE_ID
pnpm wrangler secret put CONTENTFUL_ACCESS_TOKEN
pnpm wrangler secret put BLEADIO_URL
pnpm wrangler secret put BLEADIO_API_KEY
pnpm wrangler secret put NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY
```

## Build and Deploy

Build OpenNext worker bundle:

```bash
pnpm cf:build
```

Preview locally with Wrangler:

```bash
pnpm cf:dev
```

Deploy:

```bash
pnpm cf:deploy
```

CI deploy workflow is in `.github/workflows/deploy-cloudflare.yml`.
