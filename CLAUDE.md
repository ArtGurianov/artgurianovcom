# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Dev server with HTTPS (self-signed certs in /certificates)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm api:dev      # Run Hono API Worker locally
pnpm api:deploy   # Deploy API Worker
pnpm db:apply     # Apply D1 schema from d1/schema.sql
```

No test runner is configured.

## Architecture

Single Next.js 15 (canary) app with React 19, App Router, and `src/` directory. Not a monorepo.

### Routing

- Route group `(main)` contains all pages
- Centralized route registry in `src/config/routing/routerConfig.ts` — typed `APP_ROUTE_IDS` constants with `urlPath` and `routerPath`

### Data Flow

- **CMS**: Contentful — fetched at build time into static pages.
- **Database**: Cloudflare D1 (raw SQL in `worker/src/lib/db.ts`) — stores form submissions.
- **API**: Separate Hono Worker (`worker/`) handles reCAPTCHA, D1 writes, and webhook dispatch.
- **Content updates**: Contentful webhook -> Worker endpoint -> GitHub `repository_dispatch` -> Pages rebuild.

### Internationalization

- `next-intl` v4 with two locales: `en-US`, `ru-RU`
- Translations in `messages/{locale}.json`
- Locale set per deployment via `NEXT_PUBLIC_APP_LOCALE` env var (not URL-based)
- Zod schema factories accept `t` translation function for localized errors

### Styling

- Tailwind CSS v4 (new `@import "tailwindcss"` syntax in `globals.css`, no `tailwind.config.js`)
- Custom color scales (dirt, swamp, bruise) and per-product CSS variables for themed cards
- shadcn/ui: `new-york` style, `stone` base color, CSS variables mode
- `cn()` utility from `src/lib/utils.ts` (clsx + tailwind-merge)

### 3D & Animation

- Three.js background via @react-three/fiber (`src/components/BackgroundModel/`)
- Framer Motion for page transitions
- Cookie-gated initial animation (`INITIAL_ANIMATION_COOKIE_KEY`)

### Forms

- react-hook-form + Zod resolvers + Google reCAPTCHA v3
- Blead.io notifications on submission (`src/config/bleadio.ts`)

## Key Conventions

- **Path alias**: `@/*` → `src/*` — always use for imports
- **SVG imports**: `import Svg from './foo.svg'` for component, `import url from './foo.svg?url'` for URL (via @svgr/webpack)
- **Feature folders**: PascalCase with barrel `index.ts` exports
- **ESLint**: `react-hooks/exhaustive-deps` is intentionally disabled
- **Client/Server split**: Frontend is static-first; interactive forms call Worker API via `src/lib/api.ts`
- **Responsive**: Custom `useBreakpoint(bp)` hook matches Tailwind breakpoints; `MountedGuard` prevents SSR hydration mismatches
