# Portfolio TODO — Priority Backlog

Prioritized from a codebase audit (2026-09-20). P0 = blocking/broken, P1 = high impact,
P2 = medium, P3 = nice-to-have. Tick items off as they ship.

---

## P0 — Critical (broken, missing, or misrepresenting the work)

- [ ] **P0-5. Turn the 1 demo project into a real case study.**
  - Problem: one screenshot + generic description doesn't prove seniority.
  - Do: add role, timeline, team size, 3 screenshots (home/listing/cart), Lighthouse + a11y
    scores, what YOU built vs starter. Fix the URL and use one consistent name for
    slug/repo/title.
  - Files: `src/config/content/projects.ts`, `src/components/features/home/ProjectCard.tsx`,
    `public/images/`
  - Done when: the card answers "what did you do, how long, result, proof?" without clicking away.

- [ ] **P0-6. Add 2 "proprietary work" summaries (no demo needed).**
  - Problem: best work (Decathlon Svelte DS across 15+ countries, −1.5s LCP) is invisible.
  - Do: add 2 cards marked "Proprietary — details on request": Svelte design system (role,
    adoption, A/B wins), Decathlon ES perf (before/after LCP, Lighthouse, WCAG rollout).
  - Files: `src/config/content/projects.ts` (add `proprietary?`, `role`, `timeline`, `outcomes[]`)
  - Done when: portfolio shows 3 items (1 open + 2 proprietary), honestly labelled.

## P2 — Medium (SEO, architecture, polish)

- [ ] **P2-1. Add project detail routes.** It's a pure single page; the only sitemap URL is
      `/`. Add `/projects/[slug]` (or `#` anchors) with deep-dive content, then expand the sitemap.
  - Files: `src/app/`, `src/app/sitemap.tsx`, `src/config/content/projects.ts`

## P3 — Low / nice-to-have

- [ ] **P3-1. De-duplicate `Project` types.** `ProjectCard.tsx` re-declares a `ProjectType`
      inline that duplicates `projects.ts`. Export the type from the content module.
  - Files: `src/config/content/projects.ts`, `src/components/features/home/ProjectCard.tsx`

- [ ] **P3-2. Add a `.env.example` + documented env matrix.** Complement P0-3; document which
      vars are build-time (`NEXT_PUBLIC_*`) vs runtime server-only.

- [ ] **P3-3. Add an `og-image` generator.** `og-image.png` is static; derive OG images per
      route/project via `next/og` so shared links stay current.

- [ ] **P3-4. Add JSON-LD `BreadcrumbList`/`Project` schema.** Only `Person`/`WebSite` exist;
      add project schema once detail routes land (P2-1).

- [ ] **P3-5. Consolidate lint configs.** Both `.eslintrc.json` and `eslint.config.mjs` exist
      (flat + legacy). Confirm which is active and delete the dead one.
  - Files: `.eslintrc.json`, `eslint.config.mjs`

- [x] **P3-6. Add error tracking transport.** Sentry wired via the wizard
      (`sentry.{server,edge}.config.ts`, `src/instrumentation*.ts`, `app/global-error.tsx`, and
      `withSentryConfig`); additionally `logError` and `app/error.tsx` now call
      `Sentry.captureException` so contact-form/server errors actually reach Sentry. CSP updated
      for the ingest hosts and the `/monitoring` tunnel is excluded from the proxy matcher.
      Note: set `SENTRY_AUTH_TOKEN` in Vercel for source-map uploads, and consider lowering
      `tracesSampleRate` from `1` (100%) in production.
  - Files: `sentry.server.config.ts`, `sentry.edge.config.ts`, `src/instrumentation.ts`,
    `src/instrumentation-client.ts`, `src/app/global-error.tsx`, `src/app/error.tsx`,
    `src/lib/error-tracking.ts`, `next.config.mjs`, `csp.config.mjs`, `src/proxy.ts`

- [ ] **P3-7. Add a lightweight blog/notes route.** Optional SEO + authority play once the
      content backlog is clear.
