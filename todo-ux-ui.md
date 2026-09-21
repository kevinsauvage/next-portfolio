# UX / UI TODO — kevin-sauvage.com

## P0 — Trust & first-impression blockers

### [~] 2. Make the portfolio carry the senior story it claims

**Why:** The copy sells "5+ years, 15+ countries, 1M+ users, WCAG at scale, −1.5s LCP", but the portfolio shows **one** generic demo. The strongest evidence lives only in career/FAQ text. A recruiter scanning the portfolio sees a junior-looking section.
**Where:** `src/config/content/projects.ts`, `src/components/features/home/ProjectCard.tsx`, `src/components/features/home/PortfolioSection.tsx`.
**Change:** Turn the single item into a real case study (role, timeline, what was built vs. starter, measurable outcome) and add 2 honestly-labelled `Proprietary — details on request` cards (Decathlon/Keolis). Keep it to 3 strong items; `Project` already supports `role`, `timeline`, `highlights`.
**Done (part 1):** added a dedicated `/projects/[slug]` case study route (`ProjectCaseStudy`, structured data, sitemap entry) with real scope — 23 routes, 11 GraphQL contracts, features, engineering decisions and QA — and `role`/`timeline` on the card plus a "Read case study" link. **Still open:** the 2 proprietary Decathlon/Keolis cards.
**Impact:** High · **Effort:** M

### [ ] 3. Decide the primary CTA and make it unmistakable

**Why:** Hero offers _"See impact"_ (scroll) as primary and _"Resume"_ as secondary, while the header CTA is _"Resume"_. Two different "primary" actions; a visitor is not told what to do next.
**Where:** `src/components/features/home/Hero.tsx:60-84`, `src/components/layout/Header.tsx:23-34`.
**Change:** Pick one lead action (recommend "View CV / Resume" or "Get in touch"), make it consistently primary across header + hero, keep the other as ghost.
**Impact:** High · **Effort:** S

---

## P2 — UX friction & consistency

### [ ] 10. Primary nav has no active-section state (no scrollspy)

**Why:** With 7 sections and a single-page layout, users get no feedback on where they are. Hover-only styling also means the current section is invisible on touch.
**Where:** `src/components/layout/Navigation.tsx`, `src/components/shared/ScrollDetector.tsx`.
**Change:** Track the section in view (IntersectionObserver) and apply an `aria-current="true"` + visual active treatment to the matching nav item.
**Impact:** Medium · **Effort:** M

### [ ] 11. Carousel changes are silent for assistive tech + no keyboard arrows

**Why:** Clicking next/prev/dots swaps the testimonial with no live announcement, and the carousel isn't operable with arrow keys. `Read full` collapses per-slide with no announcement either.
**Where:** `src/components/features/home/TestimonialsCarousel.tsx:100-209`, `TestimonialCard.tsx:109-135`.
**Change:** Wrap the slide region in `aria-live="polite"` and add left/right arrow key handling on the carousel container; expose `aria-roledescription="carousel"`.
**Impact:** Medium · **Effort:** M

### [ ] 12. Body copy uses `font-light` (300) on near-black

**Why:** `font-light` at 16–18px on `#000` with muted zinc tones is noticeably harder to read than 400, especially on low-DPI screens and in the long `About`/FAQ paragraphs.
**Where:** `src/app/layout.tsx:64`, `src/components/ui/Typography/Body.tsx:14`.
**Change:** Use 400 for body copy; reserve 300 for large display text only.
**Impact:** Medium · **Effort:** S

### [ ] 13. 404 page has an invalid class, weak CTA contrast, and a non-descriptive alt

**Why:** `h-ful` is not a Tailwind class (dead), the home button uses `text-zinc-300` on `bg-primary-800` (low contrast), and the illustration's `alt="404"` is meaningless.
**Where:** `src/app/not-found.tsx:16,22-28`.
**Change:** Fix to `h-full` (or drop), meet 4.5:1 on the button, and set `alt=""` (decorative) or a descriptive string.
**Impact:** Medium · **Effort:** S

### [ ] 14. Contact success has no persistent/confident state

**Why:** Success is only a toast; the form resets silently. Users who look away can miss it and re-submit. There's no inline "message sent" confirmation or next-step reassurance.
**Where:** `src/components/features/contact/ContactForm.tsx:33-60`.
**Change:** Replace the form with a short success panel (icon + "I'll reply within 24h" + "Send another"), keeping the toast optional.
**Impact:** Medium · **Effort:** M

### [ ] 15. Dead stagger in the mobile menu

**Why:** Each menu `<li>` sets `style={{ animationDelay }}` but has no animation class, so the stagger never runs; the `animate-slide-in-left` is only on the panel.
**Where:** `src/components/layout/MobileMenuToggle.tsx:64`.
**Change:** Add an entrance class to the items (respecting `prefers-reduced-motion`) or remove the unused style.
**Impact:** Low-Medium · **Effort:** S

### [ ] 16. "View Credential for X" names are verbose for screen readers

**Why:** The `sr-only` suffix produces names like `"View Credential for C1 English Certificate"` repeated five times — functional but chatty.
**Where:** `src/components/features/home/CertificationCard.tsx:126-127`.
**Change:** Consider `aria-label="View C1 English Certificate credential"` (lead with the subject), or keep visible text short and put context first.
**Impact:** Low-Medium · **Effort:** S

---

## P3 — Polish & consistency

### [ ] 17. Every section heading uses the identical animated gradient

**Why:** `SectionHeader` and `AboutSection` both render `H2` with `animate-gradient bg-[length:200%_auto]`. Seven near-identical gradient headings flatten hierarchy and make the page feel templated.
**Where:** `src/components/ui/Section/SectionHeader.tsx:34-39`, `src/components/features/home/AboutSection.tsx:20-26`.
**Change:** Reserve the animated gradient for the hero/H1; use solid or a subtler treatment for section H2s so the hero stays the focal point.
**Impact:** Low-Medium · **Effort:** S

### [ ] 18. Card hover reveals/moves content with no focus parity

**Why:** Cards lift, glow, and rotate icons on `:hover` only (`.card-enter[style*='--hover-transform']:hover`), so keyboard users get none of that affordance, and touch users lose it entirely.
**Where:** `src/styles/globals.scss:117-126`, `src/components/ui/Card/Card.tsx`, `src/components/ui/Card/CardImage.tsx:69`.
**Change:** Mirror hover styles on `:focus-within`, and ensure any information revealed on hover is visible by default.
**Impact:** Low-Medium · **Effort:** S

### [ ] 19. Nested width containers (`container` → `Section max-w-5xl`)

**Why:** `page.tsx` wraps sections in `container px-6`, and `Section` adds its own `max-w-5xl m-auto`, while `ContactSection` sits outside the container. Alignment can drift between sections at large widths.
**Where:** `src/app/page.tsx:19-27`, `src/components/ui/Section/Section.tsx:35`.
**Change:** Choose one width system (section-level max-width) and let it own horizontal padding consistently.
**Impact:** Low · **Effort:** M

### [ ] 20. `h-dvh` hero on short/landscape phones

**Why:** The hero is forced to `h-dvh` with centered content; on landscape phones the CTA stack can crowd or clip.
**Where:** `src/components/features/home/Hero.tsx:31`.
**Change:** Use `min-h-dvh` and let content define height.
**Impact:** Low · **Effort:** S

### [ ] 21. Blur placeholder is a 1×1 pixel

**Why:** The base64 `blurDataURL` is a 1×1 image; large screenshots flash a flat tone before load rather than a soft preview.
**Where:** `src/components/ui/Card/CardImage.tsx:77`.
**Change:** Generate a small real blur (or use `placeholder='empty'` and reserve space) to avoid the flash.
**Impact:** Low · **Effort:** M

### [ ] 22. Add a design-token / component reference

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
