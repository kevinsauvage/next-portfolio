# Portfolio TODO — Priority Backlog

Prioritized from a codebase audit (2026-09-20). P0 = blocking/broken, P1 = high impact,
P2 = medium, P3 = nice-to-have. Tick items off as they ship.

---

## P0 — Critical (broken, missing, or misrepresenting the work)

- [x] **P0-1. Deployment is handled by Vercel.** Pushing to `main` auto-deploys — no action
      needed. (Optional cleanup: `deploy.yml` only echoes a placeholder and is now redundant;
      delete it to avoid a misleading workflow.)

- [x] **P0-2. Fix the CI checks that silently pass.** Removed the `|| echo` fallbacks and the
  broken boolean chain in `ci.yml`; `code-quality.yml` now runs ESLint, type-check, and Prettier
  directly. Also formatted the pre-existing unformatted files so `format:check` genuinely passes.
  - Files: `.github/workflows/ci.yml`, `.github/workflows/code-quality.yml`

- [x] **P0-3. Correct the README.** Rewrote it to match reality: Next.js 16 / React 19 /
  Tailwind v4, Umami (not Vercel Analytics), Server Actions for the contact form, real script
  list, and an env-var table. Added `.env.example` mirroring `src/lib/env.ts`.
  - Files: `README.md`, `.env.example` (new), `src/lib/env.ts`

- [x] **P0-4. Remove placeholder metadata.** Standardized the public email on
  `kevinsauvage@outlook.com` (the address the site actually displays) in `package.json` and
  `README.md`; `sections.ts` already used it.
  - Files: `package.json`, `src/config/content/sections.ts`, `README.md`

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

---

## P1 — High impact (correctness, credibility, test coverage)

- [ ] **P1-1. Add tests for the contact flow.** Only `Button` and `analytics` are tested;
      `send-mail.tsx` (validation, captcha scoring, error mapping) and `ContactForm.tsx` have none.
  - Files: `src/actions/send-mail.tsx`, `src/components/features/contact/ContactForm.tsx`,
    `src/test/setup.ts`
  - Done when: happy path + validation failure + captcha failure are covered.

- [ ] **P1-2. Add automated a11y tests.** The site claims WCAG compliance but has no axe
      test. Add `vitest-axe`/`jest-axe` assertions for key sections and the testimonials carousel;
      wire into CI.
  - Files: new `*.test.tsx`, `vitest.config.ts`, `.github/workflows/ci.yml`
  - Done when: an ARIA/contrast regression fails the build.

- [ ] **P1-3. Add one number per job.**
  - Problem: career bullets are specific but mostly unquantified.
  - Do: add one metric per role, ranges OK: coverage +X%, incidents −Y, LCP −1.5s, conversion +Z.
  - Files: `src/config/content/jobs.ts`
  - Done when: each job has ≥1 number a recruiter can quote.

- [ ] **P1-4. Enforce a coverage threshold.** `test:coverage` exists but nothing gates on it.
      Set thresholds in `vitest.config.ts` and publish the report in CI.
  - Files: `vitest.config.ts`, `.github/workflows/ci.yml`

- [ ] **P1-5. Re-enable real image optimization.** `ProjectCard` forces
      `unoptimized={true}`, defeating the AVIF/WebP config in `next.config.mjs`. Remove it, set a
      proper `sizes`, and confirm Cloudinary remote pattern works in the build.
  - Files: `src/components/features/home/ProjectCard.tsx`, `next.config.mjs`

- [ ] **P1-6. Add Lighthouse performance budgets.** `lighthouse.yml` uploads scores but
      asserts nothing, so regressions pass silently. Add `assertions` (perf/a11y/SEO ≥ threshold).
      Note: it currently triggers on the placeholder `Deploy` workflow — retarget it to a Vercel
      deploy hook (or a schedule) so it audits the real production URL.
  - Files: `.github/workflows/lighthouse.yml` (new `lighthouserc`)

- [ ] **P1-7. Add end-to-end coverage for the contact form.** Playwright smoke: fill form,
      submit, assert toast + reset. Guards the only real interactive flow.
  - Files: new `e2e/`, `package.json`

---

## P2 — Medium (SEO, architecture, polish)

- [ ] **P2-1. Add project detail routes.** It's a pure single page; the only sitemap URL is
      `/`. Add `/projects/[slug]` (or `#` anchors) with deep-dive content, then expand the sitemap.
  - Files: `src/app/`, `src/app/sitemap.tsx`, `src/config/content/projects.ts`

- [ ] **P2-2. Make the sitemap dynamic.** `lastModified: new Date()` on every request and one
      static URL. Generate from content config with real `lastModified` per project.
  - Files: `src/app/sitemap.tsx`

- [ ] **P2-3. Ship 1 tiny public tool as a 2nd open project.** A micro-tool (WCAG checklist,
      LCP budget calculator) proves a11y/perf expertise faster than a second shop demo.
  - Files: `src/config/content/projects.ts` + new demo URL
  - Done when: portfolio has 2 open + 2 proprietary items.

- [ ] **P2-4. Replace `'unsafe-inline'` in `script-src` with a CSP nonce.** Inline JSON-LD
      (`StructuredData.tsx`) forces `unsafe-inline` today. Move to nonce/hash and thread it through
      `next.config.mjs` + the inline script.
  - Files: `csp.config.mjs`, `next.config.mjs`, `src/components/shared/StructuredData.tsx`

- [ ] **P2-5. Split the oversized page sections.** `page.tsx` renders 7 sections eagerly.
      Lazy-load below-the-fold sections (`next/dynamic`) to cut initial JS and improve LCP.
  - Files: `src/app/page.tsx`

- [ ] **P2-6. Add `npm audit` / dependency review to CI.** Dependabot config exists but no
      audit gate. Add an audit step to `security.yml` and group Dependabot updates.
  - Files: `.github/workflows/security.yml`, `.github/dependabot.yml`

- [ ] **P2-7. Add a visual/regression baseline for the design system.** No component
      screenshots; a token/Class change can regress silently. Consider Playwright snapshots for
      key components.

---

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

- [ ] **P3-6. Add error tracking transport.** `error-tracking.ts` logs locally; connect a
      provider (Sentry) for production visibility of contact-form/server errors.

- [ ] **P3-7. Add a lightweight blog/notes route.** Optional SEO + authority play once the
      content backlog is clear.
