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
    'ORUVA is a live pet-lifestyle store for dogs and cats, shipping European-made essentials to Spain and France. I designed and built the whole storefront on Next.js 16 and Shopify: a three-language catalog, persistent cart, customer accounts, wishlist and predictive search, with content managed in Shopify rather than in code.',
  highlights: [
    'Live at oruva.store, in English, Spanish and French',
    'Brand copy, menus, policies and page content editable in Shopify, no redeploy needed',
    'Storefront + Admin APIs typed end-to-end with GraphQL Code Generator',
    'Automated accessibility (axe, WCAG 2.1 AA) and add-to-cart smoke tests in Playwright',
  ],
  caseStudy: {
    tagline:
      'A live pet shop for the Spanish and French market: a headless Shopify storefront built solo, from brand to deployment.',
    overview: [
      'ORUVA started as a template storefront and became a real store: a premium European pet-lifestyle brand selling beds, carriers, feeders and toys for dogs and cats. The storefront is built on Next.js 16 (App Router, Cache Components) and the Shopify Storefront API, with checkout handled by Shopify.',
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
        alt: 'ORUVA collections page with Cats, Dogs and All Products tiles',
      },
      {
        src: '/images/projects/modern-ecommerce-platform/collection.jpg',
        alt: 'The All Products collection with sorting and filter controls',
      },
      {
        src: '/images/projects/modern-ecommerce-platform/product.jpg',
        alt: 'Product page for a teddy dog carrier bag with gallery, VAT-inclusive price and description',
      },
    ],
  },
  images: {
    thumbnail: {
      alt: 'ORUVA homepage: "Better products for better everyday moments together" beside a cat on a grey cat tree',
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
  title: 'ORUVA — Pet Shop E-Commerce',
  websiteLink: 'https://oruva.store/',
  // The repository is private, so there is no public source link.
  githubLink: [],
};

export const projects: Project[] = [myEcommerceProject];

export default projects;
