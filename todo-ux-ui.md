# UX / UI TODO — kevin-sauvage.com

**Why:** Tokens live inline across `@theme` and dozens of components (`text-zinc-300`, `border-zinc-800/80`, ad-hoc paddings). There's no single place to reason about spacing/type/color scales, which is already showing as one-off values.
**Where:** `src/styles/globals.scss`, `src/components/ui/**`.
**Change:** Document the type/space/color scales (the `ui-ux-pro-max` `design-system` output is a good base) and add Storybook + `@storybook/addon-a11y` for visual + a11y regression.
**Impact:** Low (long-term) · **Effort:** L

---

## Optional tooling (skills / MCP) worth adopting

- **Storybook + `@storybook/addon-a11y`** — component-level a11y + visual review; complements the current page-level `vitest-axe`.
- **`@axe-core/playwright`** — run axe inside the existing Playwright e2e (`e2e/contact.spec.ts`) for real-browser coverage.
- **Lighthouse CI** — already scaffolded in `lighthouserc.json`; wire it into CI so the current 100s don't regress.
- **Chrome DevTools MCP** — available in this session; useful for repeatable traces/traces of the above.
- **`ui-ux-pro-max` skill** — already installed; query `--domain ux` / `--stack nextjs` for implementation detail when fixing items 4–9.

> No packages, MCP servers, or config files were installed/modified for this audit. Items above are recommendations only.
