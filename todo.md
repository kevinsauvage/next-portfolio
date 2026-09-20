# Portfolio TODO — Priority Backlog

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

- [ ] **P3-7. Add a lightweight blog/notes route.** Optional SEO + authority play once the
      content backlog is clear.
