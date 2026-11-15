# TODO

Open work only; shipped work lives in `git log`. Last reviewed 2026-11-15.

## Security (owner)

- [ ] **Rotate the email credentials** (`EMAIL_ADDRESS`, `EMAIL_PASSWORD`) that are readable in the history of
      branches `develop` and `update/update-sass`, then delete both branches. **Why:** the repository is public;
      neither branch is used (407 and 310 commits off `main`).
- [ ] **Mark `RECAPTCHA_SECRET_KEY` and `email_js_private_key` as Sensitive on Vercel** and remove them from
      the Development environment. **Why:** they are stored as plain, readable values.

## Dependencies

- [ ] **ESLint 9 → 10 and `eslint-plugin-unicorn` 65 → 78.** Both ignored in `.github/dependabot.yml`: unicorn
      78 requires ESLint 10, and the other plugins' peers stop at 9. Remove the ignore entries when they accept it.
- [ ] **`minimatch` moderate advisory** through `@typescript-eslint` and `eslint-plugin-sonarjs` (dev only,
      Dependabot alert #141). No safe fix yet; the production audit is clean.

## Housekeeping

- [ ] **Delete the bot branches:** seven `snyk-*` (2023–2025) and seven `complyloop/fix-*` (2026-09), each one
      unmerged commit ahead of `main`. Check nothing in them is wanted first.
