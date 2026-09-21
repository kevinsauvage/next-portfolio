import { projects } from '@/config/content/projects';

export const SITE_URL = 'https://www.kevin-sauvage.com' as const;
// Bump this when site content changes so crawlers see a meaningful `lastModified`.
export const SITE_LAST_MODIFIED = '2026-09-21' as const;
export const PERSON_NAME = 'Kévin Sauvage' as const;
export const FRONTEND_DEVELOPER = 'Frontend Software Engineer' as const;
export const SCHEMA_CONTEXT = 'https://schema.org' as const;

/** Canonical metadata copy — single source of truth for head + JSON-LD. */
export const SEARCH_TITLE =
  `${PERSON_NAME} - Frontend Engineer | React, Next.js, Svelte — Accessible E-commerce at Scale` as const;
export const SITE_DESCRIPTION =
  "Frontend Engineer at Keolis Group with 5+ years shipping high-performance web products used by millions across 15+ countries — previously Decathlon's e-commerce platforms. Specialised in React, Next.js, Svelte, TypeScript, accessibility, and scalable component architecture." as const;
export const SITE_KEYWORDS =
  'frontend developer, react expert, next.js developer, svelte developer, javascript developer, web accessibility, wcag, performance optimization, core web vitals, e-commerce development, design systems, user experience, typescript, tailwind css, barcelona' as const;

export const personSchema = {
  '@context': SCHEMA_CONTEXT,
  '@type': 'Person',
  name: PERSON_NAME,
  jobTitle: FRONTEND_DEVELOPER,
  email: 'kevinsauvage@outlook.com',
  url: SITE_URL,
  description: 'Developing performance-focused, inclusive web products that leave no one behind.',
  about:
    'I specialize in building high-performance web applications with a focus on accessibility and inclusivity. Passionate about delivering seamless experiences to users of all abilities.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ES',
    addressLocality: 'Barcelona',
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: FRONTEND_DEVELOPER,
    description: `${FRONTEND_DEVELOPER} specializing in React, Next.js, Svelte, and web accessibility`,
    occupationLocation: {
      '@type': 'Place',
      name: 'Keolis Group',
    },
  },
  knowsAbout: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Svelte',
    'Web Accessibility',
    'WCAG 2.1',
    'Frontend Development',
    'Performance Optimization',
    'Core Web Vitals',
    'HTML',
    'CSS',
    'Tailwind CSS',
    'Jest',
    'Cypress',
    'Web Development',
    'Internationalization',
    'SEO',
    'User Experience',
  ],
  sameAs: [
    'https://www.linkedin.com/in/kevin-sauvage',
    'https://github.com/kevinsauvage',
    SITE_URL,
  ],
} as const;

export const websiteSchema = {
  '@context': SCHEMA_CONTEXT,
  '@type': 'WebSite',
  name: `${PERSON_NAME} - Portfolio`,
  url: SITE_URL,
  author: {
    '@type': 'Person',
    name: PERSON_NAME,
  },
  description: `Portfolio website of ${PERSON_NAME}, ${FRONTEND_DEVELOPER}`,
  inLanguage: 'en',
} as const;

export const professionalServiceSchema = {
  '@context': SCHEMA_CONTEXT,
  '@type': 'ProfessionalService',
  name: `${PERSON_NAME} - Frontend Development Services`,
  url: SITE_URL,
  description:
    'Professional frontend development services specializing in React, Next.js, and web accessibility',
  areaServed: 'Worldwide',
  serviceType: 'Frontend Development',
} as const;

/** Featured projects, described as schema.org `Project` items. */
export const projectsSchema = {
  '@context': SCHEMA_CONTEXT,
  '@type': 'ItemList',
  name: 'Featured projects',
  itemListElement: projects.map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Project',
      name: project.title,
      description: project.description,
      url: project.websiteLink,
      sameAs: project.githubLink,
      keywords: project.technologies.map(technology => technology.name).join(', '),
    },
  })),
} as const;

/**
 * Breadcrumb trail. Single entry today (the site is one page); project detail
 * routes (P2-1) should append their own crumbs here.
 */
export const breadcrumbSchema = {
  '@context': SCHEMA_CONTEXT,
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
  ],
} as const;
