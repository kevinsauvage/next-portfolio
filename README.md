# Next.js Portfolio

The source of [kevin-sauvage.com](https://www.kevin-sauvage.com/), my portfolio. It's a single page built with Next.js 16, TypeScript and Tailwind CSS, with a contact form (Server Action, EmailJS, reCAPTCHA v3), a statically prerendered Content Security Policy, and automated accessibility testing in CI.

## Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Accessibility** - WCAG 2.1 compliant with proper heading hierarchy
- **Performance** - Lazy loading, pre-sized images served straight from `/public`, and Core Web Vitals
- **Contact Form** - Server Action + EmailJS with reCAPTCHA v3 protection
- **Animations** - Smooth transitions and micro-interactions
- **SEO Ready** - Meta tags, Open Graph, JSON-LD, sitemap, and robots.txt
- **Type Safety** - Full TypeScript implementation
- **Testing** - Vitest setup with React Testing Library
- **Code Quality** - ESLint and Prettier configuration
- **Analytics** - Google Tag Manager behind a consent banner (Consent Mode v2)

## Tech Stack

- **Framework**: Next.js 16 with App Router (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (tokens in CSS `@theme`) + a single global CSS stylesheet
- **Icons**: Lucide React
- **Forms**: React Server Actions with Zod validation
- **Email**: EmailJS (`@emailjs/nodejs`, server-side)
- **Spam protection**: Google reCAPTCHA v3
- **Analytics**: Google Tag Manager + GA4, gated by a cookie consent banner (Consent Mode v2)
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
upload). Point it at the live site (with the locale prefix for i18n sites) and re-run when the project changes:

```bash
SCREENSHOT_BASE_URL=https://develop.oruva.store/en npm run screenshots
```

It crawls the demo for the home, collections index, first collection and first product page, clears
the cookie banner, and writes optimised JPEGs to `public/images/projects/<slug>/`. Flags:
`--base <url>`, `--slug <slug>`, `--out <dir>`, `--full` (full-page). See
`scripts/capture-project-screenshots.mjs`.

## Configuration

### Environment Variables

Variables are validated with Zod in `src/lib/env.ts`. See `.env.example` for the full list.

| Variable                                | Scope  | Used at | Required | Purpose                                                       |
| --------------------------------------- | ------ | ------- | -------- | ------------------------------------------------------------- |
| `email_js_service_id`                   | Server | Runtime | Yes      | EmailJS service ID                                            |
| `email_js_public_key`                   | Server | Runtime | Yes      | EmailJS public key                                            |
| `email_js_private_key`                  | Server | Runtime | Yes      | EmailJS private key                                           |
| `email_js_template_id`                  | Server | Runtime | Yes      | EmailJS template ID                                           |
| `RECAPTCHA_SECRET_KEY`                  | Server | Runtime | Yes      | reCAPTCHA v3 verification secret                              |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`        | Public | Build   | Yes      | reCAPTCHA v3 site key                                         |
| `GA4_MEASUREMENT_ID`                    | Public | Runtime | No       | GA4 measurement id loaded by the site's own Google tag        |
| `GTM_ID`                                | Public | Runtime | No       | Google Tag Manager container id (analytics disabled if unset) |
| `GOOGLE_SITE_VERIFICATION`              | Server | Runtime | No       | Google Search Console verification token                      |
| `NEXT_PUBLIC_ANALYTICS_ENABLE_IN_DEV`   | Public | Build   | No       | Enable GTM events when running locally                        |
| `NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE` | Public | Build   | No       | Sentry client trace sampling rate (default 0.1)               |
| `SENTRY_TRACES_SAMPLE_RATE`             | Server | Runtime | No       | Sentry server/edge trace sampling rate (default 0.1)          |
| `SENTRY_AUTH_TOKEN`                     | Server | Build   | No       | Upload source maps at build/deploy (Vercel/CI)                |
| `UPSTASH_REDIS_REST_URL`                | Server | Runtime | No       | Upstash Redis REST URL for durable rate limiting              |
| `UPSTASH_REDIS_REST_TOKEN`              | Server | Runtime | No       | Upstash Redis REST token for durable rate limiting            |

**Build-time vs runtime.** Anything prefixed `NEXT_PUBLIC_` (and `NEXT_PUBLIC_ANALYTICS_ENABLE_IN_DEV`) is inlined into the client bundle when you run `next build`, so changing it requires a rebuild — it is **not** read at runtime. Everything else is read from the environment when the server process runs, so you can change it without rebuilding. `SENTRY_AUTH_TOKEN` is build-only: set it in Vercel (and CI) so Sentry can upload source maps; it is never shipped.

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

- Design tokens: defined with Tailwind CSS 4's `@theme` in `src/styles/globals.css`
- Global styles: `src/styles/globals.css`
- Tailwind: v4, configured in CSS (`@theme` in `src/styles/globals.css`), no JS config file

### Images

`next.config.mjs` sets `images.unoptimized: true`: Vercel's image optimizer is over quota (402 on
`/_next/image`), and the project screenshots are already small JPEGs, so they are served as-is from
`/public`. Re-enable the optimizer if the quota is lifted.

### Security: Content Security Policy (CSP)

This project sets a CSP as a **static header**, built by `csp.config.mjs` and applied in `next.config.mjs`. Key directives:

- **default-src**: 'self'
- **script-src**: 'self' and `'unsafe-inline'`, plus Google Tag Manager / Analytics / reCAPTCHA
  - Inline scripts are allowed with `'unsafe-inline'` rather than a per-request nonce. A nonce can only be attached during server-side rendering, which pins every route to dynamic rendering; every page here is prerendered instead. This is a deliberate trade — see the render note below for what it gives up.
  - Allowed hosts: `https://www.googletagmanager.com`, `https://www.google-analytics.com`, `https://www.google.com`, `https://www.gstatic.com`; `https://vercel.live` is added only on Vercel preview deployments (`VERCEL_ENV=preview`)
  - `'unsafe-eval'` is added only outside production (React tooling/HMR); the production header does not include it.
- **style-src**: 'self' and `'unsafe-inline'` (no external font stylesheet — fonts are self-hosted via `next/font`)
- **font-src**: 'self' and `data:` URIs
- **connect-src**: 'self', Google Tag Manager, Google Analytics (`*.google-analytics.com`, `*.analytics.google.com`), and Google (reCAPTCHA). Sentry goes through the same-origin `/monitoring` tunnel
- **img-src**: 'self', `data:`, `blob:`, and `https:`
- **frame-src**: `https://www.googletagmanager.com` (GTM noscript iframe) and `https://www.google.com` (reCAPTCHA)
- **frame-ancestors**: 'self'
- **object-src**: 'none'; **base-uri**: 'self'; **form-action**: 'self'; `upgrade-insecure-requests`

Notes and exceptions:

- **Analytics & consent**: the site's own Google tag (`GA4_MEASUREMENT_ID`) and the GTM container (`GTM_ID`) both load only after the visitor grants analytics or advertising consent (`GoogleTagManager.tsx`). Consent Mode v2 starts every optional category as `denied` from an inline script in `<head>` (`ConsentModeDefaults.tsx`), and the stored choice is re-applied on `gtag` before either script is fetched. The Google tag is loaded here rather than by the container's `Google Tag` tag: that path pulls gtag.js with `cx=c` and never issues the GA4 configuration, so GA4 received zero hits. The container still runs and owns the GA4 event tags that forward the `dataLayer` events below — gtag.js alone does not forward those. Do not also configure a `Google Tag` tag for the same measurement id, or page views double-count. The banner (`CookieBannerLoader` → `CookieBanner`) writes a `localConsent` cookie — six-month lifetime, versioned — and the footer's **Cookie settings** button reopens it. State and signals live in `src/lib/consent.ts`, so the banner, the loader and `trackEvent` all read one source of truth.
- **Custom events**: `trackEvent()` in `src/lib/analytics.ts` pushes to the GTM `dataLayer`, sanitizing payloads to GA4's limits, respecting DNT, and dropping every event until analytics consent exists. Server components tag elements declaratively with `data-analytics-event` + `data-analytics-*`; the delegated listener in `AnalyticsTracker.tsx` turns them into events. Pageviews are left to the GA4 configuration tag in the container.
- **Structured Data (JSON-LD)**: Inline `<script type="application/ld+json">` blocks are covered by `script-src 'unsafe-inline'`.
- **reCAPTCHA v3**: Requires `www.google.com` and `www.gstatic.com` in `script-src`, `connect-src`, and `frame-src`.
- **No GTM preconnect**: A hint to `googletagmanager.com` would reach Google before consent, so the loader warms the connection only at request time.
- **Render trade-off (decided)**: every route is statically prerendered (`○`) so the HTML is served from the CDN edge. That requires dropping the nonce — Next.js can only attach a nonce during SSR, and it has no hash-based CSP path for inline scripts (its experimental SRI support only adds `integrity` attributes to external files). The cost is the loss of CSP protection against inline-script injection, since `script-src` carries `'unsafe-inline'`; the site renders no user input as HTML, so the practical surface is small. Reintroducing the nonce means going back to dynamic rendering.

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
│   └── content/           # Page copy + site data (sections, jobs, projects, social, cookies, privacy)
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
