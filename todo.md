# Global Project TODO

## P0 — Critical

### [ ] Fix the "View Live" project link (broken/wrong destination)

**Why:** `websiteLink` serves a Shopify demo branded "Crisp Ecommercer" (title/CSP confirm Shopify Storefront, `/collections` 404s), while the card titles it "Modern E-Commerce Platform" and the repo is named `nextjs-strapi-ecommerce` — the live demo, repo, slug and title don't agree, so the link looks broken. Verified via HTTP: it is a Shopify app, not a "strapi" one.

**Where:** `src/config/content/projects.ts:38` (`websiteLink`), `githubLink`, `src/components/features/home/ProjectCard.tsx`.

**Change:** Verify each project URL resolves to the actual demo described; point the live link and repo at the same project, drop dead links, and make slug/repo/title consistent. Remove `unoptimized={true}` on the image while here (see P2).

**Impact:** High

### [ ] Make the project/section content tell the senior story it claims

**Why:** The site positions the owner as a senior frontend engineer but shows **one** demo with a generic description. The strongest evidence (Svelte design system across 15+ countries, −1.5s LCP, WCAG rollout, axe-gated CI) lives only in career bullets and FAQ text, not in the portfolio. The old `todo.md` identifies this correctly and it is still open.

**Where:** `src/config/content/projects.ts` (add `role`, `timeline`, `outcomes`, `proprietary?`), `src/components/features/home/ProjectCard.tsx`.

**Change:** Turn the one project into a real case study (role, timeline, what was built vs starter, measurable outcome) and add 2 honestly-labelled "Proprietary — details on request" cards for the Decathlon/Keolis work. Keep it to 3 strong items.

**Impact:** High
