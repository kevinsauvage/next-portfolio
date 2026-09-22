# Next.js Portfolio

A modern, accessible portfolio website built with Next.js 16, TypeScript, and Tailwind CSS. Features a clean design, smooth animations, and comprehensive developer experience tooling.

## Overview

This portfolio showcases professional work, skills, and experience through a responsive single-page application. Built with performance and accessibility in mind, it includes contact forms, project showcases, and a modern tech stack.

## Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Accessibility** - WCAG 2.1 compliant with proper heading hierarchy
- **Performance** - Optimized images, lazy loading, and Core Web Vitals
- **Contact Form** - Server Action + EmailJS with reCAPTCHA v3 protection
- **Animations** - Smooth transitions and micro-interactions
- **SEO Ready** - Meta tags, Open Graph, JSON-LD, sitemap, and robots.txt
- **Type Safety** - Full TypeScript implementation
- **Testing** - Vitest setup with React Testing Library
- **Code Quality** - ESLint and Prettier configuration
- **Analytics** - Umami (privacy-first), proxied same-origin

## Tech Stack

- **Framework**: Next.js 16 with App Router (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (tokens in CSS `@theme`) + SCSS global stylesheets
- **Icons**: Lucide React
- **Forms**: React Server Actions with Zod validation
- **Email**: EmailJS (`@emailjs/nodejs`, server-side)
- **Spam protection**: Google reCAPTCHA v3
- **Analytics**: Umami
- **Notifications**: Sonner
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier

## Installation

1. Clone the repository:

```bash
git clone https://github.com/kevinsauvage/next-portfolio.git
cd next-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Fill in the values in `.env.local` (see [Configuration](#configuration)).

## Development

This is a private portfolio project. For development purposes:

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Code quality & verification
npm run check        # type-check + lint + prettier --check
npm run check:fix    # prettier --write + eslint --fix
npm run lint
npm run type-check
npm run format:check

# Testing
npm run test         # watch mode
npm run test:run     # single run
npm run test:coverage
npm run test:e2e     # Playwright

# Assets
npm run screenshots  # capture project screenshots into public/images/projects
```

### Project screenshots

Portfolio images are generated locally with Playwright and served from `public/` (no Cloudinary
upload). Point it at the deployed demo and re-run when the project changes:

```bash
SCREENSHOT_BASE_URL=https://nextjs-shopify-storefront-demo.vercel.app npm run screenshots
```

It crawls the demo for the home, collections index, first collection and first product page, clears
the cookie banner, and writes optimised JPEGs to `public/images/projects/<slug>/`. Flags:
`--base <url>`, `--slug <slug>`, `--out <dir>`, `--full` (full-page). See
`scripts/capture-project-screenshots.mjs`.

## Configuration

### Environment Variables

Variables are validated with Zod in `src/lib/env.ts`. See `.env.example` for the full list.

| Variable                                | Scope  | Used at | Required | Purpose                                              |
| --------------------------------------- | ------ | ------- | -------- | ---------------------------------------------------- |
| `email_js_service_id`                   | Server | Runtime | Yes      | EmailJS service ID                                   |
| `email_js_public_key`                   | Server | Runtime | Yes      | EmailJS public key                                   |
| `email_js_private_key`                  | Server | Runtime | Yes      | EmailJS private key                                  |
| `email_js_template_id`                  | Server | Runtime | Yes      | EmailJS template ID                                  |
| `RECAPTCHA_SECRET_KEY`                  | Server | Runtime | Yes      | reCAPTCHA v3 verification secret                     |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`        | Public | Build   | Yes      | reCAPTCHA v3 site key                                |
| `UMAMI_ID`                              | Public | Runtime | No       | Umami website ID (analytics disabled if unset)       |
| `UMAMI_DOMAINS`                         | Public | Runtime | No       | Restrict the tracker to these domains                |
| `GOOGLE_SITE_VERIFICATION`              | Server | Runtime | No       | Google Search Console verification token             |
| `NEXT_PUBLIC_UMAMI_ENABLE_IN_DEV`       | Public | Build   | No       | Enable Umami when running locally                    |
| `NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE` | Public | Build   | No       | Sentry client trace sampling rate (default 0.1)      |
| `SENTRY_TRACES_SAMPLE_RATE`             | Server | Runtime | No       | Sentry server/edge trace sampling rate (default 0.1) |
| `SENTRY_AUTH_TOKEN`                     | Server | Build   | No       | Upload source maps at build/deploy (Vercel/CI)       |
| `UPSTASH_REDIS_REST_URL`                | Server | Runtime | No       | Upstash Redis REST URL for durable rate limiting     |
| `UPSTASH_REDIS_REST_TOKEN`              | Server | Runtime | No       | Upstash Redis REST token for durable rate limiting   |

**Build-time vs runtime.** Anything prefixed `NEXT_PUBLIC_` (and `NEXT_PUBLIC_UMAMI_ENABLE_IN_DEV`) is inlined into the client bundle when you run `next build`, so changing it requires a rebuild — it is **not** read at runtime. Everything else is read from the environment when the server process runs, so you can change it without rebuilding. `SENTRY_AUTH_TOKEN` is build-only: set it in Vercel (and CI) so Sentry can upload source maps; it is never shipped.

Server-only values must **not** be prefixed with `NEXT_PUBLIC_`, otherwise they are exposed to the browser.

### Content Management

Update content in the `src/config/content/` directory:

- `sections.ts` - Page section titles and descriptions
- `jobs.ts` - Professional experience
- `certifications.ts` - Education and certifications
- `projects.ts` - Portfolio projects
- `testimonials.ts` - Client testimonials
- `passions.ts` - Skills and approach
- `faq.ts` - Frequently asked questions

### Styling

- Design tokens: defined with Tailwind CSS 4's `@theme` in `src/styles/globals.scss`
- Global styles: `src/styles/globals.scss`
- Tailwind config: `tailwind.config.js`

### Security: Content Security Policy (CSP)

This project sets a strict CSP with a per-request **nonce**, generated in `src/proxy.ts` (Next 16's renamed middleware). Key directives:

- **default-src**: 'self'
- **script-src**: 'self' plus a per-request nonce and Umami/Google (reCAPTCHA)
  - The nonce (`'nonce-<random>'`) replaces `'unsafe-inline'`. Next automatically attaches it to its own `<script>` tags, and inline JSON-LD in `src/components/shared/StructuredData.tsx` reads it from the `x-nonce` header.
  - Allowed hosts: `https://cloud.umami.is`, `https://gateway.umami.is`, `https://www.google.com`, `https://www.gstatic.com`, `https://va.vercel-scripts.com`, `https://vercel.live`
  - `'unsafe-eval'` is added only outside production (React tooling/HMR); the production header does not include it.
- **style-src**: 'self' and `'unsafe-inline'` (no external font stylesheet — fonts are self-hosted via `next/font`)
- **font-src**: 'self', `https://fonts.gstatic.com`, and `data:` URIs
- **connect-src**: 'self', Umami, and Google
- **img-src**: 'self', `data:`, `blob:`, and `https:`
- **frame-src**: `https://www.google.com` (reCAPTCHA)
- **object-src**: 'none'; **base-uri**: 'self'; **form-action**: 'self'; `upgrade-insecure-requests`

Notes and exceptions:

- **Umami**: Tracker script proxied same-origin via `/growth/script.js` → `https://cloud.umami.is/script.js`, and collect calls via `/growth/api/send` → `https://gateway.umami.is/api/send` (Umami Cloud moved collection there on 2026-06-06). `data-host-url='/growth'` keeps tracking first-party; `script-src`/`connect-src` also allow the upstream hosts as fallback. Pageviews are auto-tracked (the tracker observes History API navigations — do not call `track()` manually for those). Custom events go through `trackEvent()` in `src/lib/analytics.ts`, which queues pre-load events, sanitizes payloads to Umami's event-data limits, respects DNT, and is disabled outside production unless `NEXT_PUBLIC_UMAMI_ENABLE_IN_DEV=true`. Optional `UMAMI_DOMAINS` env restricts the tracker to given domains.
- **Structured Data (JSON-LD)**: Inline `<script type="application/ld+json">` blocks receive the same per-request nonce, so no `'unsafe-inline'` is needed.
- **reCAPTCHA v3**: Requires `www.google.com` and `www.gstatic.com` in `script-src`, `connect-src`, and `frame-src`.
- **Render trade-off (decided)**: reading the nonce via `headers()` opts every route into dynamic rendering, so `/` and `/projects/[slug]` are server-rendered rather than served as static HTML. This is an accepted trade-off: a nonce is the only CSP mechanism that keeps the inline Next.js bootstrap scripts strict without hashing every generated script, and Vercel's edge cache/SSR keeps the measured Lighthouse/LCP scores at the top of the range. Revisit if static export (with `'unsafe-inline'` or a post-build hash pipeline) becomes a requirement.

## Project Structure

```
src/
├── actions/                # Server Actions (contact form)
├── app/                    # Next.js App Router pages
├── components/
│   ├── features/          # Feature-specific components
│   ├── layout/            # Layout components (Header, Footer)
│   ├── shared/            # Reusable components
│   └── ui/                # Base UI components
├── config/
│   ├── content/           # Content configuration
│   └── ui/                # UI configuration (social links)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── schemas/               # Zod schemas
└── styles/                # Global styles
```

## Deployment

Deployment is handled automatically by Vercel on every push to `main` — no manual steps required.

## License

This project is proprietary and confidential. All rights reserved. See the [LICENSE](LICENSE) file for details.

## Contact

**Kévin Sauvage** - Frontend Engineer

- Portfolio: [kevin-sauvage.com](https://www.kevin-sauvage.com/)
- LinkedIn: [linkedin.com/in/kevin-sauvage](https://www.linkedin.com/in/kevin-sauvage/)
- Email: [kevinsauvage@outlook.com](mailto:kevinsauvage@outlook.com)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
