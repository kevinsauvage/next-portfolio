# Design System Reference

Single source of truth for the visual language of `kevin-sauvage.com`. Tokens are defined once in
`src/styles/globals.scss` (`@theme`) and consumed through Tailwind utilities; this document explains
the intent so new work stays consistent.

> Scope: this is a reference, not a runtime dependency. If a token changes in `globals.scss`, update
> the table here.

## 1. Color tokens

All color ramps follow the `50 → 950` scale and are exposed as Tailwind color utilities
(`bg-primary-500`, `text-secondary-300`, `border-accent-700`, …).

| Token         | Hue   | Role                                                           |
| ------------- | ----- | -------------------------------------------------------------- |
| `primary-*`   | Green | Primary actions, active states, success, brand accent          |
| `secondary-*` | Cyan  | Secondary accents, links, supporting highlights                |
| `accent-*`    | Amber | Tertiary highlights, warning-ish emphasis                      |
| `neutral-*`   | Stone | Neutral scale (warm grey) — used sparingly vs. Tailwind `zinc` |
| `regal-blue`  | Blue  | One-off custom color (`--color-regal-blue`)                    |

**Surface convention:** the page canvas is `bg-black`; cards/sections use translucent
`zinc-900/50 → zinc-950/80` gradients over it, with `border-zinc-800/80` and
`ring-white/[0.04]`. Muted copy is `zinc-300`/`zinc-400`; headings are `zinc-50`.

**Semantic usage**

| Meaning        | Class                                                           |
| -------------- | --------------------------------------------------------------- |
| Focus ring     | `outline 2px rgb(74 222 128)` via `*:focus-visible` (global)    |
| Primary text   | `text-zinc-50`                                                  |
| Body text      | `text-zinc-200`                                                 |
| Muted text     | `text-zinc-300` / `text-zinc-400`                               |
| Interactive    | `text-primary-300/400`, `hover:text-primary-200`                |
| Error          | `text-rose-400`, `border-rose-400`                              |
| Brand gradient | `from-primary-400 via-secondary-500 to-accent-500` (hero/marks) |

## 2. Typography

Fonts (loaded in `src/app/layout.tsx` via `next/font/google`):

| Variable         | Family            | Use                               |
| ---------------- | ----------------- | --------------------------------- |
| `--font-heading` | Plus Jakarta Sans | Headings (`font-heading`)         |
| `--font-base`    | Inter             | Body / UI (`font-sans`)           |
| `--font-code`    | JetBrains Mono    | Overlines / numbers (`font-mono`) |

Type components (`src/components/ui/Typography`):

| Component   | Element | Size                                                 | Weight   | Notes                  |
| ----------- | ------- | ---------------------------------------------------- | -------- | ---------------------- |
| `Display`   | `h1`    | `text-5xl md:text-6xl lg:text-7xl`                   | bold     | Hero only              |
| `H1`        | `h1`    | `text-4xl md:text-6xl`                               | bold     | Page titles            |
| `H2`        | `h2`    | `text-3xl md:text-5xl`                               | bold     | Section titles (solid) |
| `H3`        | `h3`    | `text-2xl md:text-3xl` (`sm`: `text-xl md:text-2xl`) | semibold | Card titles            |
| `H4`        | `h4`    | `text-xl md:text-2xl`                                | semibold | Sub-sections           |
| `H5`        | `h5`    | `text-lg md:text-xl`                                 | semibold | Minor headings         |
| `Body`      | `p`     | `text-base md:text-lg`                               | normal   | Long-form copy         |
| `BodySmall` | `p`     | `text-sm md:text-base`                               | normal   | Dense copy / card text |
| `Caption`   | `span`  | `text-sm`                                            | medium   | Metadata               |
| `Overline`  | `p`     | `text-xs` mono, uppercase, tracked                   | medium   | Section eyebrow        |

**Rules**

- Exactly one `h1` per page. Hero and case-study hero use `H1` with the brand gradient.
- The animated brand gradient is **reserved for hero/H1**. Section `H2`s are solid `zinc-50` so the
  hero stays the focal point.
- Body copy is weight **400** (`font-normal`), not 300 — 300 is reserved for large display text.

## 3. Spacing & layout

- **Content width:** `Section` owns `max-w-5xl m-auto w-full px-6`. Pages do **not** add their own
  `container`/`px-6` around sections (single source of width + gutter).
- **Section vertical rhythm** (`Section` `spacing` prop): `sm` `py-16 md:py-24`, `md` `py-20 md:py-32`
  (default), `lg` `py-24 md:py-40`, `xl` `py-32 md:py-48`.
- **Card padding** (`Card` `size` prop): `sm` `p-4 sm:p-5`, `md` `p-6 sm:p-7 md:p-8`,
  `lg` `p-8 sm:p-10 md:p-12`.
- **Stack spacing:** `CardContent` uses `space-y-3`/`4`/`6` by `spacing` prop; feature grids use
  `gap-6`.
- **Breakpoints:** Tailwind defaults — `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536.
- **Touch targets:** interactive controls ≥ 44px (`min-h-11` / `min-h-[48px]`).

## 4. Radii, shadows, motion

| Token group | Values                                                                                                                     |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| Radius      | `rounded-md` (controls), `rounded-lg` (media/inputs), `rounded-xl` (cards), `rounded-2xl` (panels), `rounded-full` (pills) |
| Shadows     | `shadow-glow-sm/md/lg` — emerald glow (`rgba(34,197,94, …)`) for primary cards/CTAs                                        |
| Durations   | `200ms` (hover/color), `300ms` (transforms/shadow), `500ms` (carousel), `700ms` (reveal)                                   |
| Easing      | `ease-out` for entrances/lifts; `cubic-bezier(0.22, 1, 0.36, 1)` for reveal                                                |

**Motion policy**

- Entrance animation primitive: `<Reveal>` (IntersectionObserver) — renders visible when JS/reduced
  motion/IO unavailable, so content is never trapped at `opacity: 0`.
- `prefers-reduced-motion: reduce` globally collapses durations to `0.01ms` and disables
  `card-enter`/`reveal` animations (`globals.scss`).
- **Hover parity:** card lift (`--hover-transform`) and glow/zoom are mirrored on `:focus-within` so
  keyboard users get the same affordance (see `globals.scss` + `Card`/`CardImage`).

## 5. Component inventory (`src/components/ui`)

| Primitive   | Exports                                                                    | Use                                                                          |
| ----------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Button      | `Button`, `ButtonLink`, `buttonStyles` (`getButtonClasses`)                | Actions and links; variants `primary`/`secondary`, sizes `sm`/`md`/`lg`/`xl` |
| Card        | `Card`, `CardContent`, `CardHeader`, `CardFooter`, `CardIcon`, `CardImage` | Content surfaces; `hover`/`glow` variants                                    |
| Form        | `FormError`, `Input`, `Label`, `RequiredIndicator`, `TextArea`             | Accessible form fields (errors linked via `aria-describedby`)                |
| Section     | `Section`, `SectionHeader`                                                 | Page width + rhythm + optional scroll reveal                                 |
| Typography  | `Display`, `H1`–`H5`, `Body`, `BodySmall`, `Caption`, `Overline`           | Text scale                                                                   |
| NumberBadge | `NumberBadge`                                                              | Ordered index chips                                                          |
| Tag         | `Tag`                                                                      | Tech/skill chips                                                             |

Shared (non-`ui`) building blocks live in `src/components/shared`: `Reveal`, `MeshGradient`,
`GridBackground`, `ScrollDetector`, `ContactInfo`, `BrandIcons`, `StructuredData`, `SonnerToaster`.

## 6. Conventions & anti-patterns

- Prefer primitives over raw elements; when a one-off is needed, reuse the tokens above instead of
  inventing new colors/sizes.
- Don't hard-code hex values in components — use Tailwind token utilities.
- Don't add a second `container`/`max-w-*` wrapper around `Section`.
- Icon-only controls need an accessible name; decorative icons get `aria-hidden`.
- Collapsed/visually-hidden content must be removed from the a11y tree (`hidden`/`inert`), not just
  `opacity: 0`.

## 7. Follow-ups

- **Storybook + `@storybook/addon-a11y`** is not installed; it would add per-component visual + a11y
  review on top of the current page-level `vitest-axe` and Playwright suites.
