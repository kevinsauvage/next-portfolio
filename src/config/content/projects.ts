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
    'A production-shaped storefront built on Next.js 16 and the Shopify Storefront API. Covers the full shopper journey — collections, product pages, a persistent cart, customer accounts, orders, wishlist and predictive search — with every GraphQL operation typed end-to-end.',
  highlights: [
    'Storefront + Admin APIs typed end-to-end with GraphQL Code Generator',
    'Cart, auth, account, order history, wishlist and predictive search',
    'Lighthouse accessibility & best-practices 100 on desktop and mobile',
  ],
  caseStudy: {
    tagline:
      'A full e-commerce storefront on the Shopify Storefront API — catalog, cart, customer accounts, orders and search, typed end-to-end.',
    overview: [
      'A complete storefront built on Next.js 16 (App Router) and the Shopify Storefront API, with a Shopify Admin API integration for delegated operations. The goal was to mirror the depth of a real storefront — not stop at a product grid and a cart.',
      'It follows the full shopper journey: browse and filter collections, open a product, manage a persistent cart, sign in, track orders, keep a wishlist and recover an account. Content, contact and legal pages are part of the same system.',
    ],
    facts: [
      { label: 'App routes', value: '23' },
      { label: 'GraphQL contracts', value: '11' },
      { label: 'UI components', value: '145' },
      { label: 'Lighthouse a11y', value: '100' },
    ],
    features: [
      {
        title: 'Collections & merchandising',
        description:
          'Index and per-collection pages driven by Shopify menus and handles, with paginated product grids (16 per page) and filter parsing.',
      },
      {
        title: 'Product detail',
        description:
          'Variant selection, pricing, inventory awareness and product media, wired to the Storefront API with ISR for fast repeat views.',
      },
      {
        title: 'Persistent cart',
        description:
          'Cart state in React Context, synced to the Shopify cart and persisted across sessions so items survive reloads and redeploys.',
      },
      {
        title: 'Predictive search',
        description:
          'Instant suggestions backed by a dedicated API route that queries the Storefront API as the shopper types.',
      },
      {
        title: 'Customer accounts',
        description:
          'Register, login, password recovery and reset, plus a signed-in account dashboard — all through Server Actions.',
      },
      {
        title: 'Orders & address book',
        description:
          'Order history and full address CRUD (list, create, edit) against the Shopify Customer API.',
      },
      {
        title: 'Wishlist',
        description: 'Saved products tied to the customer account, with add/remove flows.',
      },
      {
        title: 'Content & legal',
        description:
          'A contact form (Nodemailer + durable rate limiting) alongside privacy, terms, refund and shipping pages.',
      },
      {
        title: 'Dark mode & consent',
        description:
          'Theme switching via next-themes that follows system preference, plus a cookie-consent flow gating Google Tag Manager.',
      },
    ],
    technical: [
      {
        title: 'Typed GraphQL end-to-end',
        description:
          'GraphQL Code Generator turns the Shopify Storefront and Admin schemas into a typed SDK, so every query and mutation is checked at build time. Codegen runs as part of the build.',
      },
      {
        title: 'Storefront API + Admin API',
        description:
          'Catalog, cart and customer flows use the Storefront API; selected operations use the Admin API through short-lived (24h) delegate tokens rather than exposing admin scope to the client.',
      },
      {
        title: 'Server-first data, actions for mutations',
        description:
          'Server Components fetch through the SDK while forms and mutations go through Server Actions validated with Zod, keeping credentials off the client.',
      },
      {
        title: 'Targeted ISR',
        description:
          'Per-resource revalidation windows (search 5 min, product 1 h, Shopify data 10 min) keep the catalog fresh without giving up static speed.',
      },
      {
        title: 'Hardened delivery',
        description:
          'Nonce-based Content-Security-Policy, robots rules that keep cart/account/search out of the index, and an explicit trust boundary for the Shopify buyer IP.',
      },
      {
        title: 'Serverless-safe rate limiting',
        description:
          'Contact submissions are throttled with Upstash Redis so limits hold across serverless instances instead of resetting on every cold start.',
      },
    ],
    responsibilities: [
      'Architected the App Router structure, data-fetching and revalidation strategy',
      'Integrated the Shopify Storefront and Admin GraphQL APIs end-to-end',
      'Built the component system on Radix UI + shadcn/ui primitives',
      'Implemented accessibility, testing and delivery hardening',
      'Owned deployment, environment validation and SEO plumbing',
    ],
    quality: [
      'Unit tests across cart, auth and wishlist services, Shopify helpers, env validation and utils',
      'Strict TypeScript with generated GraphQL types — no hand-written API shapes',
      'ESLint and Stylelint in CI, plus build-time codegen',
      'Lighthouse accessibility and best-practices 100 on desktop and mobile',
      'Metadata, sitemap, robots and canonical URLs wired per route',
    ],
    gallery: [
      {
        src: '/images/projects/modern-ecommerce-platform/collections.jpg',
        alt: 'Collection index page with a paginated product grid',
      },
      {
        src: '/images/projects/modern-ecommerce-platform/collection.jpg',
        alt: 'A single collection page with filterable products',
      },
      {
        src: '/images/projects/modern-ecommerce-platform/product.jpg',
        alt: 'Product detail page with variants, pricing and specifications',
      },
    ],
  },
  images: {
    thumbnail: {
      alt: 'Screenshot of the Shopify storefront homepage',
      src: '/images/projects/modern-ecommerce-platform/home.jpg',
    },
  },
  technologies: [
    { name: 'Next.js 16' },
    { name: 'React 19' },
    { name: 'TypeScript' },
    { name: 'Shopify Storefront API' },
    { name: 'Shopify Admin API' },
    { name: 'GraphQL' },
    { name: 'GraphQL Code Generator' },
    { name: 'Tailwind CSS 4' },
    { name: 'Radix UI' },
    { name: 'shadcn/ui' },
    { name: 'Server Actions' },
    { name: 'Zod' },
    { name: 'Upstash Redis' },
  ],
  title: 'Modern E-Commerce Platform',
  websiteLink: 'https://nextjs-shopify-storefront-demo-kevinsauvages-projects.vercel.app/',
  githubLink: ['https://github.com/kevinsauvage/nextjs-shopify-storefront'],
};

export const projects: Project[] = [myEcommerceProject];

export default projects;
