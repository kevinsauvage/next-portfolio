# TODO — Performance

Open work from the codebase review. Measure before changing loading behavior or adding dependencies.

## Budgets and assets

- [ ] **Add a client-bundle budget.** The repository has an `analyze` script, but CI has no route-level JavaScript size guard. Record current first-load JS for `/` and `/projects/[slug]`, set budgets from the measured baseline, and fail CI on meaningful regressions.
- [ ] **Revisit Lighthouse coverage in CI.** Lighthouse assertions currently run only on a weekly/manual live-site workflow and cover the homepage plus one project page. Add a stable preview or production smoke gate for the core routes, keeping thresholds realistic and reports available when a regression fails.
- [ ] **Track image bytes by rendered use.** Next image optimization is deliberately disabled because of the Vercel quota. Measure the actual bytes and rendered dimensions of the current project screenshots, then reduce or generate appropriately sized static variants where that produces a measurable saving without relying on `/_next/image`.
