# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Dev server with HTTPS (self-signed certs in /certificates)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint
pnpm db:generate  # prisma generate
pnpm db:migrate   # prisma migrate dev --config prisma.config.ts
pnpm cf:build     # opennextjs-cloudflare build --dangerouslyUseUnsupportedNextVersion
pnpm cf:dev       # wrangler dev
pnpm cf:deploy    # opennextjs-cloudflare deploy
```

No test runner is configured.

## Architecture

Single Next.js 15 (canary) app with React 19, App Router, and `src/` directory. Not a monorepo.

### Routing

- Route group `(main)` contains all pages
- Centralized route registry in `src/config/routing/routerConfig.ts` — typed `APP_ROUTE_IDS` constants with `urlPath` and `routerPath`

### Data Flow

- **CMS**: Contentful — fetched in Server Components via `getContentfulEntriesByType` (`src/config/contentful/`)
- **Database**: Cloudflare D1 via Prisma adapter (`src/config/db.ts`, `prisma/schema.prisma`) — stores form submissions (EmailSubscription, Application)
- **Server Actions**: `src/actions/` — handle form submissions with reCAPTCHA v3 verification
- **Cache revalidation**: Contentful webhook at `POST /api/contentful` triggers `revalidatePath`

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
- **Client/Server split**: Server Components for data fetching, `"use client"` directive for interactive components, `"use server"` in `src/actions/`
- **Responsive**: Custom `useBreakpoint(bp)` hook matches Tailwind breakpoints; `MountedGuard` prevents SSR hydration mismatches
