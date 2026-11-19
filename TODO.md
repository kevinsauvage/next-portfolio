# TODO

Open work only; shipped work lives in `git log`. Last reviewed 2026-11-19.

## Content

- [ ] **ContextLayer case study (the AI project).** Add a `contextlayer` entry to `src/config/content/projects.ts`
      following the ComplyLoop one, with images in `public/images/projects/contextlayer/` (captured by hand:
      `npm run screenshots` only crawls the storefront). No public demo yet: present it as screenshots, a short
      recording and the public source; `websiteLink` points to the repository until a demo exists. Blocked on
      the `contextlayer` "Portfolio presentation" item (its `TODO-NON-CODE.md`): screenshots, README and honest
      evaluation figures come from there. Gate: `npm run check`, `npm run test:run`, `npm run build`.

## Dependencies

- [ ] **ESLint 9 → 10 and `eslint-plugin-unicorn` 65 → 78.** Both ignored in `.github/dependabot.yml`: unicorn
      78 requires ESLint 10, and the other plugins' peers stop at 9. Remove the ignore entries when they accept it.
- [ ] **`minimatch` moderate advisory** through `@typescript-eslint` and `eslint-plugin-sonarjs` (dev only,
      Dependabot alert #141). No safe fix yet; the production audit is clean.
