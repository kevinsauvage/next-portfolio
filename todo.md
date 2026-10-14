# Codebase review — TODO

Review date: 2026-10-14. Ordered by priority inside each section.
Items marked **(ask first)** touch areas AGENTS.md lists under "Ask first" (CSP, rate limiting, env validation, CI, deps, Sentry).

---

## 1. Bugs / logic errors

- [x] **Contact success/error analytics stop firing after the first submission** — `src/components/features/contact/ContactForm.tsx:91-99`. The effect compares `prevStatusRef` to the new _status_. After one success, a second success (via "Send another message") keeps status `'success'`, so `CONTACT_FORM_SUBMIT_SUCCESS` is never sent again. Two errors in a row have the same problem. Compare on the `formState` object instead of its status (each action returns a new object). Add a test that submits twice.
- [ ] **Anyone can block a victim's email address without passing reCAPTCHA** — `src/actions/send-mail.tsx:187`. `enforceRateLimits` runs (and uses up the per-email bucket, 3 per 10 min) _before_ validation and captcha. A bot can send junk with someone else's email and lock that address out of the form. Move the per-email limit after `validateCaptcha` succeeds and keep only the per-IP limit up front. **(ask first: rate limiting)**
- [ ] **Redis keys can be left with no TTL, which blocks a client forever** — `src/lib/rate-limit.ts:76-109`. The `SET NX` → `INCR` → `PTTL` pipeline isn't a transaction. If the key expires between `SET` and `INCR`, `INCR` creates a key with no expiry. `PTTL` then returns `-1` and the count grows forever. Use `/multi-exec`, or add `PEXPIRE key windowMs NX` after `INCR`, and treat `ttl < 0` as "re-seed". Also check `results[i].error`. **(ask first)**
- [ ] **reCAPTCHA check ignores `action` and `hostname`, and has no timeout** — `src/actions/send-mail.tsx:35-48`. A token minted for another action or site (same key) is accepted. Check `response.action === 'contactMessage'` and the hostname. Add `signal: AbortSignal.timeout(5000)` and check `captchaResponse.ok` so a slow Google call can't hang the action.
- [ ] **reCAPTCHA provider swap remounts the whole contact section** — `src/components/shared/GoogleReCaptchaProviderWrapper.tsx:40-52`. Going from `children` to `<Provider>{children}</Provider>` changes the tree shape, so React remounts `ContactForm`, and anything typed before the provider loads is lost (easy to hit when landing on `/#contact`). Keep the tree stable (always render the provider and defer only the script), or wrap only the form. Also pass the real CSP nonce instead of `nonce: ''`, and drop the `'NOT DEFINED'` fallback key.
- [ ] **"reCAPTCHA is not available, refresh the page" shows while the script is still loading** — `ContactForm.tsx:181-186`. `executeRecaptcha` is `undefined` until the script loads, so a fast submit shows a misleading error. Wait or retry briefly, or disable submit until it's ready.
- [ ] **Invalid `<time dateTime>` values** — `TestimonialCard.tsx:215` and `CertificationCard.tsx:75` pass human strings (`'September 2025'`, `'March 2024'`) as `dateTime`. Store ISO values (`2025-09`, `2024-03`) in `config/content` and keep a separate display label.
- [ ] **Card hover-lift config is ignored on case-study cards** — `src/styles/globals.scss:117-127` only applies `--hover-transform` to `.card-enter[...]`, and `.card-enter` is only added when `animationIndex` is set. `FeatureGrid` / `TechnicalGrid` in `ProjectCaseStudy.tsx` pass `hover='subtle'` with no `animationIndex`, so they never lift. Decouple the selector from `.card-enter`.
- [ ] **Conflicting Tailwind classes (H2 order fixed; button/Input items remain); the winner depends on CSS order:**
  - `H2.tsx:28` puts `className` _first_ (`clsx(className, classes, …)`), so overrides from `SectionHeader` and `AboutSection` (`text-4xl md:text-5xl lg:text-6xl`) compete with the built-in `text-3xl md:text-5xl`. Put `className` last, like the other Typography components.
  - The `buttonStyles.ts` secondary variant adds `rounded-lg inline-flex relative overflow-hidden group` on top of base `rounded-md flex relative overflow-hidden`. Remove the duplicates and conflicts. (Consider `tailwind-merge` **(ask first: dependency)**.)
  - `Input.tsx` / `TextArea.tsx`: a `className` passed by the caller replaces _all_ styles because `{...rest}` comes after `className`. Merge it in instead.
- [ ] **Project page can render empty** — `ProjectCaseStudy.tsx:105` returns `null` when `caseStudy` is missing, but `generateStaticParams`, the sitemap and `ProjectCard` include every project. Make `caseStudy` required, or filter projects without one everywhere (one `getCaseStudyProjects()` helper).
- [x] **Re-granting consent pushes `gtag('config')` again** — `GoogleTagManager.tsx` second effect: grant → revoke → grant calls `pushGoogleTagBootstrap` twice (duplicate `page_view`). Guard it with a ref.
- [x] **`MobileMenuToggle` body scroll lock** — `MobileMenuToggle.tsx:33` sets `overflow = 'auto'` instead of `''`, which overrides stylesheet values, and nothing restores it on unmount. Reset to `''` in the effect cleanup.
- [x] **Timers not cleared on unmount** — the `TestimonialsCarousel.tsx:41,63,75,86` `setTimeout`s update state after unmount. The cleanup returned by `resetAnimation` is thrown away. `useFocusTrap.tsx` `setTimeout(focus, 100)` has the same problem.
- [x] **`SpinnerLoader` uses `fill='currentFill'`** (`SpinnerLoader.tsx:17`). That isn't a valid paint value (copy-paste from Flowbite), so the arc falls back to black. The `dark:`/`gray-*` classes don't fit this dark-only, zinc palette. Use `currentColor` plus design tokens.
- [ ] **Category card looks clickable but isn't** — `CookieBanner.tsx` category `<div>` has `cursor-pointer hover:` styles, but only the label and checkbox toggle. Make the whole card a `<label>`, or drop the pointer styling.
- [x] **Contact-form HTML constraints don't match the Zod schema** — `ContactForm.tsx:261,299` sets `minLength={2}` / `{10}` while the schema requires `min(1)`, and no `maxLength` from `CONTACT_FIELD_LIMITS`. Derive the attributes from `CONTACT_FIELD_LIMITS`.

## 2. Security / privacy

- [x] **Raw error message sent to GA** — `src/app/error.tsx:25` pushes `error.message` to the dataLayer. That contradicts `lib/error-tracking.ts`, which says raw messages never go to analytics (they can contain PII or URLs). Send only `digest`.
- [ ] **`sendMail` is exported from a `'use server'` file** — `send-mail.tsx:77`. Every export of a server-action module is a potential action endpoint, and this one skips the rate limits. Make it a non-exported function (or move it to a `server-only` module) and test through `sendMailAction`.
- [ ] **CSP clean-up (ask first: CSP)** — `csp.config.mjs`:
  - Remove unused hosts: `va.vercel-scripts.com` and `vitals.vercel-insights.com` (no `@vercel/analytics` dependency), and `fonts.gstatic.com` (`next/font` self-hosts). Allow `vercel.live` only in preview.
  - Sentry ingest hosts in `connect-src` aren't needed while `tunnelRoute: '/monitoring'` is used.
  - Add `frame-ancestors 'self'` (the modern equivalent of `X-Frame-Options`).
  - The `script-src` in `cspDirectives` is always overwritten by `buildCsp`. Keep a single definition.
- [ ] **Client IP derivation** — `send-mail.tsx:51-56` trusts the first `x-forwarded-for` entry. On Vercel, prefer `x-real-ip` (or `ipAddress()` from `@vercel/functions`), which the platform sets.
- [ ] **`GOOGLE_SITE_VERIFICATION` bypasses env validation** — `seo-metadata.ts:47` reads `process.env` directly even though `env.ts:31` validates it. Use `getPublicEnv()`. **(ask first: env)**
- [ ] **Escape JSON-LD** — `StructuredData` / `ProjectStructuredData` inject `JSON.stringify(...)` without escaping `<`. The content is static today, but a `</script>` in content would break out. Escape with `.replace(/</g, '\\u003c')` in a shared helper.
- [ ] `seo-metadata.ts:14` `generator: 'Next.js'` advertises the stack while `poweredByHeader: false` hides it. Remove it.

## 3. Duplication → refactor

- [x] **Nonce read in three places** (`layout.tsx`, `ConsentModeDefaults.tsx`, `StructuredData.tsx`, plus `ProjectStructuredData.tsx`). Add `getNonce()` in `src/lib/csp-nonce.ts`.
- [x] **JSON-LD `<script>` repeated 8×.** Add a `<JsonLd data nonce />` component and map over `[personSchema, websiteSchema, …]`. Use `SCHEMA_CONTEXT` instead of the literal in `StructuredData.tsx`.
- [x] **Site URL hard-coded** in `layout.tsx:109` and `robots.tsx:4` (and `opengraph-image.tsx`). Use `SITE_URL`. Drop the pointless dynamic `import('@/lib/seo-metadata')` in `generateMetadata`. Type `robots()` as `MetadataRoute.Robots`.
- [x] **Person identity is spread out:** name (`PERSON_NAME`, `Logo.tsx`, `layout.footer.name`, `opengraph-image.tsx`), email (`personSchema.email`, `sections.contact.email`), LinkedIn URL (`config/ui/social.tsx`, `seo-schemas.ts:64` without the trailing slash, `TestimonialCard.tsx:140`), GitHub URL. Create one `src/config/site.ts` and import it everywhere.
- [x] **Project lookup duplicated** in `projects/[slug]/page.tsx` (`generateMetadata` + page) and `url = ${SITE_URL}/projects/${slug}` built in 3 files. Add `getProjectBySlug()` and `projectUrl()` helpers in `config/content/projects.ts`.
- [x] **`sectionIdFromHref` + `SECTION_IDS`** copy-pasted in `Navigation.tsx` and `MobileMenuToggle.tsx`. Export them once from `config/content/layout.ts`.
- [x] **Footer quick links duplicate the header navigation items** (`config/content/layout.ts`). Derive them: `[...navigation.items, { label: 'Privacy', href: '/privacy' }]`. Also `mobileMenu.ctaButton` = `header.ctaButton`. Note the FAQ section has no nav entry.
- [x] **Hero stats markup rendered twice** (desktop + mobile blocks, `Hero.tsx`) with `ContactInfo` twice. Extract a `<HeroStats />` and render it once with responsive classes. Move the `stats` copy to `config/content/sections.ts` (AGENTS.md: copy belongs in content).
- [x] **Testimonials carousel:** `goToSlide` / `goToPrevious` / `goToNext` share the same animate-then-set logic. Replace them with one `navigate(index, direction)`. `currentIndex` and `displayedIndex` are always set together, so keep one. The prev/next button class strings are duplicated: extract them. The `Testimonial` type is re-declared in `TestimonialsCarousel.tsx` and `TestimonialCard.tsx`: export it from `config/content/testimonials.ts`.
- [x] **Two analytics mechanisms:** `Button` / `ButtonLink` call `trackEvent` in `onClick`, while everything else uses `data-analytics-*`, which `AnalyticsTracker` already delegates. Make `ButtonLink` emit `data-analytics-*`. It can then drop `'use client'` and become a server component.
- [x] **`Button` / `ButtonLink` share the same inner markup.** Extract `ButtonContent`. Both set `aria-label={label}`, which duplicates the visible text and silently overrides any caller `aria-label`. Remove it.
- [x] **Typography: 10 files with identical prop types and the gradient string.** Use one `createTypography(tag, classes)` factory or a shared `typographyProps`/`GRADIENT_TEXT` constant.
- [x] **`switch` IIFEs used as lookup tables** in `Card.tsx` (×4), `CardContent.tsx`, `CardIcon.tsx`, `CardImage.tsx`, `Section.tsx`. Replace them with `const map = {...} as const; map[key]`. `CardIcon` variants `purple` and `blue` duplicate `primary`/`secondary` styles.
- [x] **Input/TextArea** share a ~400-char class string. Extract `fieldClasses`.
- [x] **ContactForm field plumbing:** `getContactFieldSchema` → `contactFieldsSchema.shape[name]`. `focusFirstInvalidField`, `handleFieldBlur` and `collectFieldErrors` (`contact-fields.schema.ts`) all hand-write `fullName/email/message` branches. Iterate a shared `CONTACT_FIELDS` tuple exported from the schema file (the server action has its own copy too).
- [x] **Server action error mapping:** `sendMail` builds `fieldErrors` with `''` placeholders via the deprecated Zod 4 `error.format()`, and `toFieldErrors` then strips them. Reuse `collectFieldErrors` (plus captcha). `env.ts` also uses the deprecated `error.flatten()`; use `z.flattenError()`.
- [x] **Consent helpers:** `allCategories()` in `CookieBanner.tsx` duplicates `DENIED_CONSENT`. Export `GRANTED_CONSENT` / `DENIED_CONSENT` from `lib/consent.ts`.
- [ ] **Sentry config duplicated:** the DSN appears 3× and `sentry.server.config.ts` equals `sentry.edge.config.ts`. Share a `sentryBaseOptions`. **(ask first: instrumentation)**
- [x] **Scroll listeners:** `ScrollDetector` and `BackToTopButton` both track `scrollY`. Toggle a second class (`page-scrolled-far`) from `ScrollDetector` and drive the button with CSS. Merge `BackToTopButton` + `BackToTopButtonView`.

## 4. Simplification / dead code

- [ ] `jobs.ts`: every job has both `description` and `descriptionArray`, and the string is never rendered. Drop `description` and rename `descriptionArray` → `highlights`. `CareerCard` `Description` then renders an empty `<li>` if neither is set, which no longer applies.
- [ ] `TestimonialCard`: only the `carousel` variant is used. Remove `variantStyles.default` and the `variant` prop. `ICON_HOVER`/`FLEX_CENTER` constants then add little.
- [ ] Unused: `H5`, `Button` `loading` prop (+ spinner overlay), `ButtonLink` `disabled`, `Label` `missing`, `CardImage` `blurDataURL`/`unoptimized` (images are globally unoptimized), `CertificationCard` `credentialId`, `ContactFormValues`, `LayoutConfig`, `getButtonSizeClasses` export, the `logError` return value, `TrackStatus` (nobody reads it).
- [ ] `CertificationCard.safeCredentialUrl`: runtime URL validation of static, typed content. Move it to a content unit test (like `projects.test.ts`).
- [ ] `AboutSection`: the `'credentialUrl' in lang` narrowing hack and `description.split('\n\n')`. Type `languages` properly and store paragraphs as `string[]`.
- [ ] `ProjectCard`: `ProjectImage` re-declares the images type (use `Project['images']`). `githubLink: string[]` is only ever used as `[0]` (plus an `as string` cast). Make it `githubUrl?: string`.
- [ ] `ContactInfo`: the config stores JSX (`icon: <LinkedInIcon size={30}/>`) that is then `cloneElement`'d. Store the component type instead. `data-analytics-network={item.text}` sends "Visit my LinkedIn" instead of `item.id`. External links use `next/link`: use a plain `<a>`. `config/ui/social.tsx` belongs in `config/content`.
- [ ] `MobileMenuToggle`: the `mounted` state is unnecessary (the menu can only open after a client click). Use native `<dialog>.showModal()` (focus trap + Escape + inert background), drop `useFocusTrap` and the backdrop button, and wrap the links in a `<nav>`. The `animate-slide-in-left` name doesn't match the slide-from-right motion.
- [ ] Rename files without JSX: `send-mail.tsx` → `.ts`, `useFocusTrap.tsx` → `.ts`, `config/ui/social.tsx` (once icons are component refs it stays `.tsx`).
- [ ] `ContactForm` success-message fallback and all the inline strings (labels, placeholders, toasts, reCAPTCHA notice) should move to `config/content` per AGENTS.md.
- [ ] Redundant classes: `group-hover:text-zinc-200` on elements already `text-zinc-200` (`ProjectCard`, `CareerCard`, `CertificationCard`, `PassionCard`); `border-zinc-800/50` without a border width (`CareerCard` `SkillsTags`); `tabIndex={-1}` on decorative SVGs (Hero, CareerCard, CertificationCard); `hover:rotate-12` on non-interactive heading icons (Footer).
- [ ] `next.config.mjs`: `sassOptions.includePaths` points to a non-existent `./styles/`; `compress: true` is the default; `automaticVercelMonitors` with no crons; the misplaced `/** @type */` JSDoc (above the imports, so it types nothing).
- [ ] `tailwind.config.js` isn't loaded by Tailwind v4 (no `@config` in `globals.scss`). Delete it. `autoprefixer` is redundant with `@tailwindcss/postcss` **(ask first: dependency)**.
- [ ] `vercel.json`: `master` / `develop` branches probably don't exist.
- [ ] `seo-schemas.ts` `breadcrumbSchema` comment ("project detail routes (P2-1) should append…") is outdated, since `ProjectStructuredData` has its own crumbs.
- [ ] `env.ts`: `NODE_ENV` in the server schema is unused. The `email_js_*` lowercase names differ from every other env var **(ask first: env)**. "publicEnv" holds server-read values (`GA4_MEASUREMENT_ID`, `GTM_ID`): rename it to something like `runtimeEnv`.
- [ ] `trackEvent(eventName: string)`: type it as `AnalyticsEventName` (and `Button`/`ButtonLink` `eventName`) to catch typos at compile time.

## 5. Accessibility

- [ ] `aria-label` on a `<p>` (`Hero.tsx` availability pill, `AboutSection.tsx` "Current role") isn't allowed on the generic role and is ignored by many screen readers. Use visually hidden text instead.
- [ ] Double live regions: the carousel slide (`aria-live='polite' aria-atomic`) and `TestimonialCard` `<blockquote aria-live>` both announce. The `ContactForm` submit button also has `aria-live` on top of the `<output>`. Keep one each.
- [ ] `CookieBanner` reopened from the footer doesn't move focus into the panel, and closing it doesn't return focus to the trigger.
- [ ] `BackToTopButtonView` wraps a single button in a `<nav aria-label='Scroll to top'>` landmark. Remove the `nav`. Smooth scroll ignores `prefers-reduced-motion`.
- [ ] `Footer.tsx:15`: `role='contentinfo'` is redundant on `<footer>`. The `not-found.tsx` image has both `alt=''` and `aria-hidden`; one is enough.
- [ ] `FaqItem`: each panel is a `<section aria-labelledby>`, which creates a region landmark (noise with many items). `aria-hidden` is redundant with `inert`. Consider native `<details>/<summary>`.
- [ ] `Navigation` / `MobileMenuToggle`: `aria-label="Go to X section"` duplicates the visible label. Drop it.

## 6. Performance / SEO

- [ ] `priority` is deprecated in Next 16 (`node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`, `priority` section). Replace it in `not-found.tsx:32`. In `CardImage`, `priority` only maps to `loading='eager'`. Add `fetchPriority='high'` / `preload` for the case-study LCP image (`ProjectCaseStudy.tsx:186`).
- [ ] Every `glow` card renders a full `MeshGradient` (animated background + `backdrop-blur-sm`) even when hidden (opacity 0). That's many blur layers on the home page. Render it only on hover (CSS pseudo-element) or use a cheaper gradient.
- [ ] `HeadLinks`: preconnect + dns-prefetch to `www.google.com` on every page, before any consent, even though reCAPTCHA loads lazily near the contact form. This contradicts the comment right above it. Remove it, or add it only when the provider mounts. `theme-color` should go through `export const viewport`.
- [ ] Add `FAQPage` JSON-LD for the FAQ section.
- [ ] Project `generateMetadata` sets `openGraph.images`, but `twitter` has no `images`. Check that the root `twitter-image` doesn't win over the project thumbnail. Make the privacy page `og:title` / `twitter:title` consistent.
- [ ] `page.tsx` `dynamic()` imports of server components don't code-split anything that matters (they're server-rendered). Plain imports are simpler.

## 7. Tooling / CI (ask first)

- [ ] `ci.yml` runs on both `push` and `pull_request`, so PR branches run twice. Limit `push` to `main` and add `concurrency: { group: ci-${{ github.ref }}, cancel-in-progress: true }`.
- [ ] E2E runs against `next dev` (slow, needs `workers: 2`). Run against `next build && next start` in CI (reuse the build job's output).
- [ ] Lighthouse audits only the home page. Add a `/projects/[slug]` URL.
- [ ] Coverage thresholds are ~58–60%. Raise them gradually as the tests below land.
- [ ] `.husky/pre-commit`: the nvm/npx fallback boilerplate. Husky 9 just needs `npx lint-staged`. `.lintstagedrc.js` manually filters config files: use `eslint --no-warn-ignored` instead. `--max-warnings=3` is arbitrary.
- [ ] Pin GitHub Actions by SHA consistently (only the Lighthouse action is pinned).

## 8. Missing tests

- [ ] `ContactForm`: two consecutive successful submissions both fire analytics (regression for §1).
- [ ] `send-mail`: per-email limit not consumed when captcha fails; captcha `action` mismatch rejected; siteverify timeout.
- [ ] `rate-limit`: Redis returns `PTTL -1` / per-command `error`.
- [ ] `TestimonialCard`, `CareerCard`, `MobileMenuToggle` (focus trap / Escape / scroll lock), `ButtonLink`, `Reveal`, `env.ts`, `error-tracking.ts`, JSON-LD output (valid JSON, escaped).
- [ ] Content tests: ISO `dateTime` values in testimonials/certifications; credential URLs are http(s); every project has a `caseStudy`.
