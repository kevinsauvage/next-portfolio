# Portfolio Content Audit — kevin-sauvage.com

#### P0-5. Turn your 1 demo project into a real case study

- [ ] **Problem:** One screenshot + generic description doesn’t prove seniority.
- **Do this:** Add to the card: your role, timeline, team size, 3 screenshots (home / listing / cart), Lighthouse + a11y scores with images, what YOU built vs starter/template. Fix URL (remove `?authorization=true`) and use one consistent name for slug/repo/title.
- **Files:** `src/config/content/projects.ts`, `src/components/features/home/ProjectCard.tsx`, `public/images/` (new screenshots).
- **Done when:** Card answers “what did you do, how long, what was the result, where’s proof?” without clicking away.

#### P0-6. Add 2 “proprietary work” summaries (no demo needed)

- [ ] **Problem:** Your best work (Decathlon Svelte DS across 15+ countries, −1.5s LCP) is invisible because it’s closed-source.
- **Do this:** Add 2 cards marked “Proprietary — details on request”: 1) Svelte design system (role, adoption, A/B wins). 2) Decathlon ES perf (before/after LCP, Lighthouse, WCAG rollout). No screenshots needed.
- **Files:** `src/config/content/projects.ts` (add `proprietary?: boolean`, `role`, `timeline`, `outcomes: string[]`).
- **Done when:** Portfolio shows 3 items (1 open + 2 proprietary), honestly labelled.

#### P1-3. Add 1 number per job

- [ ] **Problem:** Career bullets are specific but mostly unquantified (“raising coverage”, “reducing incidents”).
- **Do this:** Add one metric per role, ranges OK: coverage +X%, incidents −Y, LCP −1.5s, conversion +Z on test W.
- **Files:** `src/config/content/jobs.ts`.
- **Done when:** Each job has ≥1 number a recruiter can quote.

#### P2-3. Ship 1 tiny public tool as 2nd open project

- [ ] **Problem:** Second shop demo proves little. A micro-tool (WCAG checklist, LCP budget calculator) proves a11y/perf expertise faster and is shareable.
- **Do this:** Build smallest useful version, deploy, add as project #4 with metrics.
- **Files:** `src/config/content/projects.ts` + new demo URL.
- **Done when:** Portfolio has 2 open + 2 proprietary items.
