# TODO

Open work only; shipped work lives in `git log`. Last reviewed 2026-11-15.

## Security (owner)

- [ ] **Mark `RECAPTCHA_SECRET_KEY` and `email_js_private_key` as Sensitive on Vercel** and remove them from
      the Development environment. **Why:** they are stored as plain, readable values.

## Dependencies

- [ ] **ESLint 9 → 10 and `eslint-plugin-unicorn` 65 → 78.** Both ignored in `.github/dependabot.yml`: unicorn
      78 requires ESLint 10, and the other plugins' peers stop at 9. Remove the ignore entries when they accept it.
- [ ] **`minimatch` moderate advisory** through `@typescript-eslint` and `eslint-plugin-sonarjs` (dev only,
      Dependabot alert #141). No safe fix yet; the production audit is clean.
