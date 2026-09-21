# Global Project TODO

Audit of `next-portfolio` — a one-page Next.js 16 portfolio (React 19, Tailwind v4, Server Action contact form on EmailJS + reCAPTCHA v3, Sentry, Umami, Playwright + Vitest). Type-check, lint, 43 unit tests and `next build` all pass today. The problems below are mostly about **content credibility, one real runtime bug, and unnecessary moving parts**, not broken infrastructure.

Priority order: correctness → missing core value → security/data → reliability → complexity → performance → polish. Existing `todo.md` overlaps and should be replaced by this file.

---

## P0 — Critical

### [ ] Fix the "View Live" project link (broken/wrong destination)

**Why:** `websiteLink` points to `nextjs-strapi-ecommerce-kevinsauvages-projects.vercel.app`, which currently serves an unrelated fashion store ("CRISP"), while the card describes a Shopify Storefront API demo. Clicking "View Live" on the portfolio misrepresents the work — the single highest-trust failure on the site.

**Where:** `src/config/content/projects.ts:38` (`websiteLink`), `githubLink`, `src/components/features/home/ProjectCard.tsx`.

**Change:** Verify each project URL resolves to the actual demo described; point the live link and repo at the same project, drop dead links, and make slug/repo/title consistent. Remove `unoptimized={true}` on the image while here (see P2).

**Impact:** High

### [ ] Make the project/section content tell the senior story it claims

**Why:** The site positions the owner as a senior frontend engineer but shows **one** demo with a generic description. The strongest evidence (Svelte design system across 15+ countries, −1.5s LCP, WCAG rollout, axe-gated CI) lives only in career bullets and FAQ text, not in the portfolio. The old `todo.md` identifies this correctly and it is still open.

**Where:** `src/config/content/projects.ts` (add `role`, `timeline`, `outcomes`, `proprietary?`), `src/components/features/home/ProjectCard.tsx`.

**Change:** Turn the one project into a real case study (role, timeline, what was built vs starter, measurable outcome) and add 2 honestly-labelled "Proprietary — details on request" cards for the Decathlon/Keolis work. Keep it to 3 strong items.

**Impact:** High

---

## P1 — High

### [ ] Harden the email action: captcha `success`, email escaping, and no PII in analytics

**Why:** `validateCaptcha` never checks `response.success` and returns a non-boolean (`response.score && ...`), so a missing/invalid score silently becomes falsy — but a `success: false` response with a score still passes. Separately, user-supplied `fullName`/`email`/`message` are passed straight into the EmailJS template (template-side HTML injection if it renders HTML), and `logError` forwards the raw error `message` and arbitrary `context` to Sentry and Umami.

**Where:** `src/actions/send-mail.tsx:19-30,64-69`, `src/lib/error-tracking.ts:14-31`.

**Change:** Return `response.success === true && typeof response.score === 'number' && response.score >= 0.7`. Truncate/validate field lengths and pass template params explicitly. Ensure `logError` never sends form contents/PII — log a sanitized message + a non-PII error code only.

**Impact:** High

### [ ] Add rate limiting / abuse protection to the contact Server Action

**Why:** The action is publicly callable and only gated by reCAPTCHA. A script that harvests tokens can spam the inbox or burn the EmailJS quota; there is no per-IP throttle, honeypot, or body-size cap.

**Where:** `src/actions/send-mail.tsx`, `src/proxy.ts`.

**Change:** Add a lightweight per-IP sliding-window limit (in-memory/edge-safe, or Vercel KV if already available) and cap field lengths in `contactFormSchema` (`fullName` ≤ 100, `email` ≤ 254, `message` ≤ 5000). Keep it boring — no captcha replacement.

**Impact:** High

### [ ] Consolidate duplicated SEO constants and stop trusting `X-XSS-Protection`/`role` noise

**Why:** Person/site constants are duplicated (`seo-metadata.ts` redefines `PERSON_NAME`, and title/description strings are split between it and `seo-schemas.ts`), so metadata and JSON-LD can drift. `next.config.mjs` also sets the deprecated `X-XSS-Protection` header (ignored by modern browsers, can introduce issues) and `layout.tsx` adds `role='main'` to `<main>` plus the header/nav both carry `aria-label='Main navigation'` — redundant semantics flagged by automated a11y tools (see stale `complyloop/fix-redundant-role-*` branches).

**Where:** `src/lib/seo-metadata.ts`, `src/lib/seo-schemas.ts`, `next.config.mjs:37-40`, `src/app/layout.tsx:81`, `src/components/layout/Header.tsx:15`, `src/components/layout/Navigation.tsx:10`.

**Change:** Export the person/title/description constants from one module and import them everywhere. Drop `X-XSS-Protection`, drop `role='main'`, and give the header/nav a single distinct label (e.g. `Primary`). Delete the stale `complyloop/*` remote branches.

**Impact:** Medium

---

## P2 — Medium

### [ ] Delete unused/dead code and collapse over-engineered analytics

**Why:** `src/lib/analytics.ts` is 271 lines exposing `trackPageview`, `identifyUmamiSession`, `trackOutboundLink`, `clearUmamiQueue`, `getUmamiQueueSize`, `isDoNotTrackEnabled` etc. that are used **only by its own test** — the app uses `trackEvent` and `flushUmamiQueue` (plus declarative `data-umami-*` attributes). `ContactForm.tsx` defines an exported `ContactFormValues` that duplicates the schema type; `certifications.ts` carцies `credentialId`, `logo`, `featured` that no card renders; `globals.d.ts`/`csp.config.d.ts` overlap. Agent-generated branches (`complyloop`, `snyk-*`) and `.DS_Store` files are litter.

**Where:** `src/lib/analytics.ts` + `analytics.test.ts`, `src/components/features/contact/ContactForm.tsx:16-20`, `src/config/content/certifications.ts`, `csp.config.d.ts`/`csp.config.d.mts`, `src/.DS_Store`.

**Change:** Keep only what the app actually calls (`trackEvent`, `sanitizeEventData`, queue flush); delete the rest and their tests. Remove unused type fields and duplicate `.d.ts` files. Add `.DS_Store` to `.gitignore` and delete the stale branches. Challenge each helper: _would we write this today for a one-page site?_

**Impact:** Medium

### [ ] Replace the hand-rolled scroll-reveal/animation system with one CSS-only approach

**Why:** Entrance animation is split across three mechanisms: `Reveal` (IntersectionObserver + `.reveal` classes), `Section` (wraps children in `Reveal`), and dozens of inline `animate-fade-in-up opacity-0` + `animationDelay` + `animationFillMode: 'both'` styles sprinkled through `Hero`, `AboutSection`, etc. The inline `opacity-0` means content is invisible until the animation runs — fragile for reduced-motion, SSR/no-JS (only partially covered by the `<noscript>` hack in `HeadLinks`) and screen readers. This is the largest source of visual-code complexity.

**Where:** `src/components/shared/Reveal.tsx`, `src/components/ui/Section/Section.tsx`, `src/components/features/home/*`, `src/styles/globals.scss`.

**Change:** Standardise on one declarative pattern (CSS `animation-timeline`/`@starting-style`, or a single `<Reveal delay>` wrapper) with `prefers-reduced-motion` handled centrally; remove per-element inline animation styles. Do not add a JS animation library.

**Impact:** Medium

### [ ] Reduce Sentry sampling noise and review telemetry/PII posture

**Why:** Client `tracesSampleRate: 1` in `instrumentation-client.ts` sends 100% of traces for a low-traffic portfolio — 10× the value at 10× the quota/cost. `error-tracking.ts` also forwards context to Umami as event data, and Sentry ships a hard-coded DSN with `dataCollection` disabled-comments left in. Analytics additionally only fires in production, so errors are effectively untested locally.

**Where:** `src/instrumentation-client.ts:11-18`, `src/lib/error-tracking.ts`.

**Change:** Set `tracesSampleRate` to a low value (e.g. `0.1`, env-driven), explicitly disable `userInfo`/`httpBodies`, and remove the sentry-to-umami error duplication (Sentry is the error store). Decide one error destination instead of two.

**Impact:** Medium

### [ ] Give projects real routes or remove the sitemap/routes abstraction

**Why:** The site is deliberately a single page, yet `src/config/routes.ts`, `sitemap.tsx`, `seo-schemas.ts` breadcrumb scaffolding and `SITE_LAST_MODIFIED` exist to publish exactly one URL. The existing `todo.md` wants `/projects/[slug]`. Either add real content routes (better SEO and the only way to give the Svelte/proprietary case studies room) or simplify the SEO layer to a static sitemap; keeping an abstraction for one entry is speculative.

**Where:** `src/config/routes.ts`, `src/app/sitemap.tsx`, `src/lib/seo-schemas.ts` (`SITE_LAST_MODIFIED`, `breadcrumbSchema`).

**Change:** If adding `/projects/[slug]`, generate detail pages from `projects.ts` and extend `siteRoutes`; otherwise inline the home entry and delete the indirection. Pick one — do not keep both.

**Impact:** Medium

### [ ] Fix image delivery: Cloudinary `unoptimized` and orphaned assets

**Why:** `ProjectCard` sets `unoptimized={true}`, bypassing Next image optimization for the only real image on the page (negating the `next.config.mjs` formats/qualities work). `next.config.mjs` also allows a Cloudinary path (`kevincloudname`) that is a placeholder name, and `public/images/og-image.png` (504 KB) is unused because OG images are generated dynamically.

**Where:** `src/components/features/home/ProjectCard.tsx:39`, `next.config.mjs:60-67`, `public/images/og-image.png`.

**Change:** Remove `unoptimized` and the bogus `remotePatterns` entry (or point it at the real Cloudinary cloud); delete the 500 KB unused OG PNG. Verify Lighthouse still passes `lighthouserc.json` budgets.

**Impact:** Medium

### [ ] Cut redundant CI and config duplication

**Why:** `ci.yml` and `code-quality.yml` both run lint + type-check on the same events; there are **two** Prettier configs (`.prettierrc` and `.prettierrc.json`, with conflicting `endOfLine`) that Prettier resolves unpredictably; `lint-staged` is configured in both `package.json` and `.lintstagedrc.js` (the JS file filters configs while the package.json entry doesn't, and they disagree on `--max-warnings`). `npm run check`/`lint:all` chains are near-duplicates.

**Where:** `.github/workflows/ci.yml`, `.github/workflows/code-quality.yml`, `.prettierrc`, `.prettierrc.json`, `.lintstagedrc.js`, `package.json:109-117`.

**Change:** Merge into one CI workflow (lint + type-check + test + build); keep a single Prettier config; keep `lint-staged` in one place only. Remove duplicate npm scripts.

**Impact:** Medium

### [ ] Replace the turnstile "Online/Offline" README with real run/verify instructions; fix metadata claims

**Why:** The README is thorough but documents CSP env vars, Google Fonts and `data-collection` behavior that don't match the code (fonts are self-hosted via `next/font`, not Google Fonts; the README's own structure section omits `lib`, `schemas`, `hooks`, `styles` precision). `package.json` still lists `sass`/`SCSS` heavily though Tailwind v4 is the primary system. New contributors (or agents) can't tell which doc is authoritative.

**Where:** `README.md`, `package.json`, `src/lib/seo-metadata.ts`.

**Change:** Correct the CSP/font/env narrative, document the actual verify commands (`npm run check`, `test:run`, `test:e2e`, `build`), and confirm SEO claims (canonical, OG image route) match implementation. Keep it short.

**Impact:** Low

---
