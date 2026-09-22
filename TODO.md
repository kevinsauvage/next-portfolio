# Global Project Audit — TODO

Baseline verified on this checkout: `type-check`, `lint`, `format:check`, `test:run` (48 tests),
and `build` all pass. Production Lighthouse on the built app: accessibility / best-practices / SEO
= 100, LCP ~0.97s, CLS 0. The issues below are ordered by impact, not by current breakage.

### P1 — High

### [ ] Reconsider the nonce-CSP trade-off forcing every route dynamic

**Why:** Reading the nonce via `headers()` in `StructuredData`/`layout` makes the whole site
server-rendered. The production build reports `/` and `/projects/[slug]` as `ƒ (Dynamic)` despite
`generateStaticParams`, so `dynamicParams = false` buys nothing and there is no static HTML / CDN
cache for the core content. The README notes the trade-off but leaves it open.

**Where:** `src/proxy.ts:1-26`; `src/components/shared/StructuredData.tsx:14`;
`src/app/projects/[slug]/page.tsx:13-15`; `README.md:176`.

**Change:** Either keep only the JSON-LD nonce and switch to hash-based CSP for the known inline
scripts so the home page and case studies can be statically generated, or scope the nonce to the
routes that actually need it.

**Impact:** Medium-High

### [ ] Close the test-coverage gap on core UI

**Why:** Coverage is `51.88% stmts / 52.37% branch / 45.94% funcs`, just over the configured
thresholds. Several load-bearing modules are at 0%: `src/proxy.ts`, `Hero`, `AboutSection`,
`CareerSection`, `CareerCard`, `ProjectSection`, `PassionCard`, `ErrorCopyButton`, the case-study
route, and most of `TestimonialsCarousel`. None of the highest-value flows are guarded.

**Where:** `vitest.config.ts:27-32` (thresholds); `src/components/features/home/*`,
`src/components/features/projects/ProjectCaseStudy.tsx`, `src/proxy.ts`.

**Change:** Add focused component tests (Hero CTA, ProjectCard links, carousel keyboard/arrow
behavior, case-study rendering) and a `proxy` CSP-header test asserting the nonce and `object-src
'none'`; then raise the thresholds so they cannot silently regress.

**Impact:** Medium

### [ ] Run Playwright e2e in CI

**Why:** CI builds, lints, type-checks, formats and unit-tests, but never runs Playwright, so the
only end-to-end coverage (contact form) is not enforced on push/PR. It also covers a single flow —
no navigation, mobile menu, or case-study smoke tests.

**Where:** `.github/workflows/ci.yml:7-49` (no e2e step); `e2e/contact.spec.ts`.

**Change:** Add a `test:e2e` job (install Playwright browsers, build or reuse the dev server on
`PORT=3001`) and add specs for header navigation, mobile menu focus trap, and a project case-study
route.

**Impact:** Medium

### [ ] Reconcile docs and config with the code

**Why:** `README.md` points at files that do not exist and describes a CSP that does not match the
header. Stale content misleads contributors and hides the real requirements.

- `README.md:151` and `README.md:192` reference `src/design-system/tokens.ts`; there is no
  `src/design-system/` directory — tokens live in `src/styles/globals.scss` (`@theme`) per
  `docs/design-system.md`.
- `README.md:146` lists `expertises.ts`; only `passions.ts` exists in `src/config/content/`.
- `README.md:164` says `style-src` has no external font stylesheet, but
  `csp.config.mjs:35` allows `https://fonts.googleapis.com`.
- `next.config.mjs:56-61` still allow-lists `res.cloudinary.com/kevincloudname`, though the README
  states images are now captured locally into `public/` (no Cloudinary).

**Where:** `README.md:146,151,164,192`; `csp.config.mjs:35`; `next.config.mjs:56-61`.

**Change:** Align the README styling/content sections with the real tree, drop the unused Google
Fonts style-src host, and remove the dead Cloudinary image pattern.

**Impact:** Low-Medium

### [ ] Broaden the project case studies

**Why:** The portfolio ships a single project (`modern-ecommerce-platform`). The case-study route,
schema, sitemap and structured data are all built to scale, but the content is the actual value
proposition and is currently thin. `sitemap.tsx` therefore lists only the home page and one project.

**Where:** `src/config/content/projects.ts:52-211`.

**Change:** Add the next 1–2 projects with the same `caseStudy` shape (facts, features, technical,
responsibilities, quality, gallery) and capture their screenshots via
`npm run screenshots -- --slug <slug>`. `SITE_LAST_MODIFIED` (`src/lib/seo-schemas.ts:5`) should
move when content changes.

**Impact:** Medium
