# Global Project Audit — TODO

Baseline verified on this checkout: `type-check`, `lint`, `format:check`, `test:run` (69 tests),
`test:coverage` (thresholds 58/55/60/58), `build`, and Playwright e2e (now run in CI) all pass.
The issue below is ordered by impact, not by current breakage.

### P1 — High

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
