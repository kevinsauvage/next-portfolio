# AGENTS.md

> Canonical agent instructions for this repo (2026 format: short index, not a manual).
> `CLAUDE.md`, `GEMINI.md`, and `.github/copilot-instructions.md` all point here — edit this file only.

## Commands

Run from repo root. Node `>=24` (see `.nvmrc`); package manager is **npm** (lockfile: `package-lock.json`).

- `npm run dev` — dev server (Turbopack, port 3000)
- `npm run build` — production build (must pass before any PR)
- `npm run check` — `type-check` + `lint` + `format:check` (fast gate, run first)
- `npm run test:run` — Vitest single run (unit, colocated `src/**/*.test.{ts,tsx}`)
- `npm run test:coverage` — Vitest with V8 coverage (thresholds in `vitest.config.ts`)
- `npm run test:e2e` — Playwright, Chromium only, starts its own dev server on port 3001
- `npm run screenshots` — regenerate `public/images/projects/*` via Playwright (needs `SCREENSHOT_BASE_URL`)

Order checks from discriminating to broad: `npm run check` → focused test file → `npm run test:run` → `test:e2e` (only if UI/routing changed). CI (`.github/workflows/ci.yml`) runs lint + type-check + format + coverage + build + Playwright.

## WHAT — stack

Next.js 16 App Router + React 19 + TypeScript strict + Tailwind CSS v4 (`@theme` tokens in `src/styles/globals.scss`) + SCSS. Forms: Server Actions (`src/actions/`) with Zod (`src/schemas/`), EmailJS server-side, reCAPTCHA v3. Analytics: Umami proxied same-origin. Error tracking: Sentry. Tests: Vitest + RTL + jsdom; E2E: Playwright (`e2e/`).

Import alias `@/*` → `./src/*`. Env is validated with Zod in `src/lib/env.ts`; see `.env.example` for the full list (never read or print real `.env` values).

## WHY — architecture pointers

- `src/app/` — routes (`page.tsx`, `layout.tsx`, `projects/[slug]`). `src/proxy.ts` is the middleware (Next 16 rename) and owns the CSP nonce — see below.
- `src/components/{ui,shared,layout,features}/` — base → reusable → layout → feature. Prefer existing `ui/` primitives and `Typography` components.
- `src/config/content/` — all page copy (sections, jobs, projects, faq). Content edits go here, not in components.
- `src/lib/` — utilities (`env.ts`, `analytics.ts`, `rate-limit.ts`, `seo-*`). `src/hooks/` — client hooks.
- Styling source of truth: `docs/design-system.md` + `src/styles/globals.scss`. Tokens once, Tailwind utilities everywhere.
- Human onboarding: `README.md` (includes the CSP trade-off notes and env table).

## HOW — non-obvious rules (read the file before touching the area)

1. **CSP nonce:** `src/proxy.ts` + `csp.config.mjs`. Inline scripts need the per-request nonce from the `x-nonce` header (see `src/components/shared/StructuredData.tsx`). `headers()` opts routes into dynamic rendering — accepted trade-off, do not "fix" by removing the nonce.
2. **Env:** `NEXT_PUBLIC_*` is inlined at `next build` time — changing it requires a rebuild. Server-only secrets must not have that prefix. Umami/Sentry sample rates are build-time; Redis/EmailJS keys are runtime.
3. **Umami:** tracker proxied via `/growth/*` rewrites in `next.config.mjs`. Pageviews auto-track; custom events only via `trackEvent()` in `src/lib/analytics.ts`.
4. **Imports:** `simple-import-sort` groups are enforced (`react`/`next` → `@/` → relative → styles). Let `npm run lint:fix` order them; do not hand-sort.
5. **Tests:** colocate as `*.test.{ts,tsx}` next to source; E2E in `e2e/`. Playwright webServer needs `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (dummy value is set in `playwright.config.ts`).

Style (Prettier + ESLint) is enforced mechanically — do not restate it here; run the tools.

## Boundaries

### Always do

- Run `npm run check` and the focused test file before declaring done.
- Add/extend a colocated test for every behavior change; keep coverage thresholds green.
- Keep heading hierarchy, focus states, and `alt` text intact (axe runs in unit tests via `vitest-axe`).
- Update `docs/design-system.md` when a token changes; update `README.md` env table when env vars change.

### Ask first

- Before adding/removing a dependency in `package.json`.
- Before changing auth, CSP (`csp.config.mjs`, `src/proxy.ts`), rate limiting, env validation, CI workflows, or public URLs/SEO (`sitemap.tsx`, `robots.tsx`, rewrites).
- Before touching `src/instrumentation*.ts` or Sentry tunnel route (`/monitoring`).

### Never do

- Never commit or print secrets (`.env`, `.env.local`, `SENTRY_AUTH_TOKEN`, EmailJS keys, reCAPTCHA secrets).
- Never push directly to `main` — Vercel deploys on push to `main`; use a branch + PR.
- Never weaken CSP, ESLint, coverage thresholds, or types to make a build pass; fix the code.
- Never delete/skip a failing test without explicit approval; never edit `node_modules/`, `.next/`, `coverage/`, `test-results/`.

## Working agreement

- Small, reviewable diffs; match the patterns in the file you are editing.
- Explore with `glob`/`grep`/`read` before writing; lazy-load referenced docs only when the task touches that area.
- Verify, don't narrate: report commands run and their result (pass/fail) at the end.
