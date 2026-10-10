export type ProjectFeature = {
  title: string;
  description: string;
};

export type ProjectFact = {
  label: string;
  value: string;
};

export type ProjectCaseStudy = {
  tagline: string;
  /** Short narrative paragraphs shown in the overview. */
  overview: string[];
  /** Verifiable numbers about the build. */
  facts: ProjectFact[];
  /** What the product does, feature by feature. */
  features: ProjectFeature[];
  /** Engineering decisions and why they were made. */
  technical: ProjectFeature[];
  /** Ownership: what was designed, built and shipped. */
  responsibilities: string[];
  /** Quality, testing and delivery practices. */
  quality: string[];
  /** Product screenshots captured from the live demo. */
  gallery: { src: string; alt: string }[];
};

export type Project = {
  slug: string;
  description: string;
  /** Public repository links. Leave empty for private projects; the source button is then hidden. */
  githubLink: string[];
  /** Your role on the project (e.g. "Lead frontend"). Optional. */
  role?: string;
  /** Delivery window (e.g. "2024 — 2025"). Optional. */
  timeline?: string;
  /** Measurable outcomes, rendered as a bullet list. Optional. */
  highlights?: string[];
  /** Deep-dive content rendered on `/projects/[slug]`. Optional. */
  caseStudy?: ProjectCaseStudy;
  images: {
    thumbnail: {
      alt: string;
      src: string;
    };
  };
  technologies: { name: string }[];
  title: string;
  websiteLink: string;
};

const myEcommerceProject: Project = {
  slug: 'modern-ecommerce-platform',
  role: 'Design & development (solo)',
  timeline: '2026',
  description:
    'ORUVA is a live European jewelry label selling everyday rings, necklaces, earrings and bracelets to shoppers in Spain and France. I designed and built the whole storefront on Next.js 16 and Shopify: a three-language catalog, persistent cart, customer accounts, wishlist and predictive search, with content managed in Shopify rather than in code.',
  highlights: [
    'Live at oruva.store, in English, Spanish and French',
    'Brand copy, menus, policies and page content editable in Shopify, no redeploy needed',
    'Storefront + Admin APIs typed end-to-end with GraphQL Code Generator',
    'Automated accessibility (axe, WCAG 2.1 AA) and add-to-cart smoke tests in Playwright',
  ],
  caseStudy: {
    tagline:
      'A live jewelry label for the Spanish and French market: a headless Shopify storefront built solo, from brand to deployment.',
    overview: [
      'ORUVA started as a template storefront and became a real store: a warm, modern European jewelry label selling gold-toned and silver pieces meant to be worn every day, not saved for later. The storefront is built on Next.js 16 (App Router, Cache Components) and the Shopify Storefront API, with checkout handled by Shopify.',
      'I owned it end to end: brand positioning, storefront design, the Shopify data model, the code, caching, deployment and monitoring. The store runs in English, Spanish and French, prices include VAT, and delivery is tracked to Spain and France.',
      'The source code is private now that it is a commercial project, so this page walks through the decisions instead. I am happy to go through the code on a call.',
    ],
    facts: [
      { label: 'Languages', value: '3' },
      { label: 'Page routes', value: '24' },
      { label: 'Unit-test files', value: '75' },
      { label: 'Delivery markets', value: 'ES · FR' },
    ],
    features: [
      {
        title: 'Catalog & product pages',
        description:
          'Collections with sorting, filters and pagination. Product pages with variant selection, an image gallery, VAT-inclusive pricing and live stock status.',
      },
      {
        title: 'Persistent cart & delivery estimate',
        description:
          'A cart kept in sync with the Shopify cart across sessions, with a delivery estimator by country and a free-shipping threshold. Payment happens on Shopify checkout.',
      },
      {
        title: 'Predictive search',
        description:
          'Instant suggestions from a dedicated API route that queries the Storefront API as the shopper types, announced to screen readers through a live region.',
      },
      {
        title: 'Customer accounts',
        description:
          'Sign-in through the Shopify Customer Account API, with an account area for orders and saved addresses.',
      },
      {
        title: 'Wishlist',
        description:
          'Saved products with optimistic add/remove, so the heart responds instantly and rolls back cleanly if the server disagrees.',
      },
      {
        title: 'Three languages',
        description:
          'English, Spanish and French with locale-prefixed routes, translated interface text and translated Shopify content.',
      },
      {
        title: 'Newsletter & contact',
        description:
          'A double opt-in newsletter and a contact form, both validated with Zod and rate limited.',
      },
      {
        title: 'Legal & consent',
        description:
          'Cookie consent that gates analytics, plus privacy, terms, refund, shipping, legal-notice and cookie pages managed in Shopify.',
      },
      {
        title: 'Dark & light themes',
        description: 'A theme switch that follows the system preference and remembers the choice.',
      },
    ],
    technical: [
      {
        title: 'Content lives in Shopify, not in env vars',
        description:
          'Hero, promo bar, FAQ, size chart, navigation and brand identity are Shopify metaobjects read through cached getters. Environment variables hold only secrets and deployment config, so a brand change never needs a rebuild. CLI scripts seed and sync that content.',
      },
      {
        title: 'Cache Components with webhook-driven purging',
        description:
          'Pages are prerendered with `use cache` and tagged. Shopify webhooks, verified with an HMAC secret, invalidate exactly the tags that changed, so the catalog stays fresh without giving up static speed.',
      },
      {
        title: 'Failures are never cached',
        description:
          'Cached getters throw instead of returning an empty fallback, so a short Shopify outage cannot poison the cache for hours. Fallbacks live in uncached wrappers, and the cart estimator sits in its own Suspense island.',
      },
      {
        title: 'Typed GraphQL end-to-end',
        description:
          'GraphQL Code Generator turns the Storefront and Admin schemas into a typed SDK, and CI fails if the generated output drifts from the committed files.',
      },
      {
        title: 'OAuth done properly',
        description:
          'Customer sign-in uses the authorization-code flow with PKCE (S256) and a state check. A proxy renews sessions and handles auth redirects.',
      },
      {
        title: 'Optimistic UI without stale rollbacks',
        description:
          'Cheap toggles like the wishlist use `useOptimistic`. The cart uses request-id sequencing, so the latest server answer always wins over a slower earlier one.',
      },
      {
        title: 'Hardened delivery',
        description:
          'Content-Security-Policy, HSTS and cross-origin headers, Zod-validated Server Actions, Upstash Redis rate limiting that holds across serverless instances, and store HTML sanitized before rendering.',
      },
    ],
    responsibilities: [
      'Defined the brand positioning and designed the storefront UI',
      'Architected the App Router structure, caching and revalidation strategy',
      'Modelled the Shopify data contract (metaobjects, menus, policies) and built the tooling to seed and sync it',
      'Integrated the Storefront, Admin and Customer Account APIs',
      'Set up deployment on Vercel, environment validation, error monitoring and SEO plumbing',
    ],
    quality: [
      '75 Vitest files covering server actions, services, auth, rate limiting, caching and Shopify helpers, with enforced coverage thresholds',
      'Playwright suites: axe accessibility checks (WCAG 2.1 AA, light and dark) over the main routes, and an add-to-cart smoke test',
      'Strict TypeScript with generated GraphQL types and no hand-written API shapes',
      'ESLint, Stylelint and Prettier, plus a codegen drift check in CI',
      'Sentry error reporting, with metadata, sitemap and robots rules generated for every language',
    ],
    gallery: [
      {
        src: '/images/projects/modern-ecommerce-platform/collections.jpg',
        alt: 'ORUVA collections page with All Products, Bracelets, Earrings and Gifts tiles',
      },
      {
        src: '/images/projects/modern-ecommerce-platform/collection.jpg',
        alt: 'The All Products collection with sorting and filter controls',
      },
      {
        src: '/images/projects/modern-ecommerce-platform/product.jpg',
        alt: 'Product page for the Moonlit Doorknocker earrings with gallery, VAT-inclusive price and description',
      },
    ],
  },
  images: {
    thumbnail: {
      alt: 'ORUVA homepage: "Jewelry made to be worn, not saved for later" beside a model wearing gold necklaces and earrings',
      src: '/images/projects/modern-ecommerce-platform/home.jpg',
    },
  },
  technologies: [
    { name: 'Next.js 16' },
    { name: 'React 19' },
    { name: 'TypeScript' },
    { name: 'Shopify Storefront API' },
    { name: 'Shopify Customer Account API' },
    { name: 'Shopify Admin API' },
    { name: 'GraphQL' },
    { name: 'GraphQL Code Generator' },
    { name: 'next-intl' },
    { name: 'Tailwind CSS 4' },
    { name: 'Radix UI' },
    { name: 'shadcn/ui' },
    { name: 'Server Actions' },
    { name: 'Zod' },
    { name: 'Upstash Redis' },
    { name: 'Playwright' },
    { name: 'Vercel' },
  ],
  title: 'ORUVA — Jewelry E-Commerce',
  websiteLink: 'https://oruva.store/',
  // The repository is private, so there is no public source link.
  githubLink: [],
};

const complyLoopProject: Project = {
  slug: 'complyloop',
  role: 'Design & development',
  timeline: '2026',
  description:
    'ComplyLoop checks React and Next.js codebases for accessibility against RGAA 4 and WCAG 2.2. It scans the source, optionally audits the running site, opens fixes as draft pull requests, and keeps an evidence log of every step. It is aimed at French agencies that deliver RGAA-regulated sites for several clients.',
  highlights: [
    'Source scan (AST checks and jsx-a11y) plus runtime audits with Playwright and axe',
    'A finding only closes once a re-run confirms the fix; AI never sets a status',
    'Append-only evidence log, exportable as JSON, Markdown or HTML',
    'Public repository, with CI, unit tests and Playwright end-to-end specs',
  ],
  caseStudy: {
    tagline:
      'A compliance tool built around one loop: find the problem, explain it, fix it, verify the fix and keep the proof.',
    overview: [
      'Most accessibility scanners stop at a list of findings. ComplyLoop is built around what happens next: each finding says what failed, where and why it matters, a fix is proposed as a draft pull request, and the finding is only closed once a new run confirms it.',
      'It targets React, Next.js and TypeScript projects and the French RGAA 4 standard alongside WCAG 2.2. You connect a GitHub repository, it scans the source, and with a preview URL it also audits the rendered pages for what a source scan cannot see, such as contrast and reflow.',
      'The product is in private preview: the landing page is public, while sign-in and the workspace stay behind a password because the workspace runs scans. The source is public to read.',
    ],
    facts: [
      { label: 'Accessibility checks', value: '132' },
      { label: 'Unit-test files', value: '244' },
      { label: 'E2E specs', value: '10' },
      { label: 'Standards', value: 'RGAA 4 · WCAG 2.2' },
    ],
    features: [
      {
        title: 'Source scan',
        description:
          'Custom AST checks together with eslint-plugin-jsx-a11y, over a shallow clone of the repository that is deleted when the job ends. Re-runs skip files that have not changed.',
      },
      {
        title: 'Runtime audit',
        description:
          'With a preview URL, Playwright and axe audit the running pages for rules a source scan cannot decide, like colour contrast, landmarks and reflow.',
      },
      {
        title: 'Findings you can act on',
        description:
          'Each finding gives what failed, why, where, the impact, a confidence level and which engine found it, so a developer can act without opening the standard.',
      },
      {
        title: 'Fixes as draft pull requests',
        description:
          'Where a patch can be generated and verified, it is opened as a draft PR. Runtime findings get guidance for the call site instead of a generic attribute.',
      },
      {
        title: 'Verification and evidence',
        description:
          'Only a re-run can mark a finding verified. Every assessment, fix and decision is appended to an evidence log that exports as JSON, Markdown or HTML.',
      },
      {
        title: 'Continuous monitoring',
        description:
          'Pushes to the default branch trigger a new assessment through webhooks, using short-lived GitHub App tokens, so checks keep running with nobody signed in.',
      },
      {
        title: 'Organisations and roles',
        description:
          'Owner, admin, member and viewer roles, invites by GitHub login, a personal organisation on first sign-in and an organisation switcher.',
      },
    ],
    technical: [
      {
        title: 'Deterministic analysis, advisory AI',
        description:
          'Statuses come from checks, not from a model. AI can explain a finding or suggest a patch, but a patch has to pass the same checks before a PR is offered, and it never sets a requirement status.',
      },
      {
        title: 'One registry for every check',
        description:
          'Each of the 132 checks is registered once, with its authority, the engines that can report it and the catalog control it backs. Coverage tests cross-check that registry against the AST checks, the rule maps and the catalog, so a check cannot ship without an engine or guidance.',
      },
      {
        title: 'Assessments as durable jobs',
        description:
          'A run is queued in Postgres and picked up by a GitHub Actions worker, claimed with FOR UPDATE SKIP LOCKED. A 15-minute schedule picks up jobs whose dispatch failed or whose lease expired, so nothing needs a long-running server.',
      },
      {
        title: 'A single write path',
        description:
          'Mutations go through write helpers that take a per-project lock and guard against stale writes. Server actions never touch the database directly, and ESLint enforces it.',
      },
      {
        title: 'Evidence that cannot be edited',
        description:
          'The evidence log is append-only: a record can be superseded, never changed. GitHub tokens are encrypted at rest with AES-256-GCM.',
      },
      {
        title: 'Boundaries enforced by lint',
        description:
          'The shared contract sits at the bottom, the app core imports only from it, and the AI module cannot import server code. ESLint fails the build when a layer reaches across.',
      },
      {
        title: 'Delivery',
        description:
          'A per-request Content-Security-Policy with a nonce, a Basic-auth preview gate that fails closed, Sentry reporting through a tunnel route, and three GitHub workflows: CI, the assessment worker and a production configuration check.',
      },
    ],
    responsibilities: [
      'Defined the product scope: the loop from requirement to evidence, and who it is for',
      'Designed the domain model, the module boundaries and the durable job architecture',
      'Built the analysis engine, the GitHub App integration, the workspace UI and the evidence exports',
      'Set up Postgres with Drizzle migrations, deployment on Vercel, CI and production checks',
    ],
    quality: [
      '244 Vitest files, with a coverage gate and a Postgres persistence integration suite',
      'Playwright end-to-end specs behind a gated harness that is never enabled on customer deployments',
      'Strict TypeScript, ESLint layer rules and a single verify command that runs lint, typecheck, tests, build and a bundle check',
      'Coverage tests that fail when a check is missing an engine, a catalog row or guidance',
    ],
    gallery: [
      {
        src: '/images/projects/complyloop/features.jpg',
        alt: 'ComplyLoop feature cards: deterministic checks, engineer-native findings, human-approved remediation, GitHub workflow, continuous re-assessment and append-only evidence',
      },
      {
        src: '/images/projects/complyloop/evidence.jpg',
        alt: 'A sample evidence trail on the ComplyLoop landing page: assessment completed, finding detected, remediation verified',
      },
    ],
  },
  images: {
    thumbnail: {
      alt: 'ComplyLoop landing page: "From RGAA requirement to verified code and audit evidence" above the six steps of the compliance loop',
      src: '/images/projects/complyloop/home.jpg',
    },
  },
  technologies: [
    { name: 'Next.js 16' },
    { name: 'React 19' },
    { name: 'TypeScript' },
    { name: 'Postgres' },
    { name: 'Drizzle ORM' },
    { name: 'Auth.js' },
    { name: 'GitHub App (Octokit)' },
    { name: 'GitHub Actions' },
    { name: 'Playwright' },
    { name: 'axe-core' },
    { name: 'Vercel AI SDK' },
    { name: 'Zod' },
    { name: 'Tailwind CSS 4' },
    { name: 'Vitest' },
    { name: 'Sentry' },
  ],
  title: 'ComplyLoop — Accessibility Compliance',
  websiteLink: 'https://complyloop.vercel.app/',
  githubLink: ['https://github.com/kevinsauvage/complyloop'],
};

export const projects: Project[] = [myEcommerceProject, complyLoopProject];

export default projects;
