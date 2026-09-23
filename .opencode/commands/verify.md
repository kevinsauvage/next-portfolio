---
description: Run the fast verification gate (check + focused unit tests)
agent: build
---

Run the repo's fast verification gate and report pass/fail per step:

1. `npm run check` (type-check + lint + format:check).
2. If `$ARGUMENTS` names test files, run `npx vitest run $ARGUMENTS`; otherwise run `npm run test:run`.
3. If any step fails, fix the code (never weaken CSP, ESLint, coverage thresholds, or types) and re-run until green.

Only run `npm run test:e2e` if UI, routing, or `src/proxy.ts` changed. Summarize each command's result at the end.
