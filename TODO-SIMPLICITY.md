# TODO — Simplicity

Open work from the codebase review. Keep behavior and current quality gates intact.

## Lint configuration

- [ ] **Trim overlapping ESLint configuration.** `eslint.config.mjs` manually configures 11 plugins across 264 lines and explicitly disables many plugin rules. Inventory which rules are still useful, remove overlapping coverage, and keep only checks that catch issues the remaining rules miss. Acceptance: lint output stays equivalent or stricter, with the shorter config documented by intent.
