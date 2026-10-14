import { faqs } from '@/config/content/faq';
import { projects } from '@/config/content/projects';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, PERSON_NAME, SITE_URL } from '@/config/site';

// Bump this when site content changes so crawlers see a meaningful `lastModified`.
export const SITE_LAST_MODIFIED = '2026-10-14' as const;
export const FRONTEND_DEVELOPER = 'Frontend Software Engineer' as const;
export const SCHEMA_CONTEXT = 'https://schema.org' as const;

/** Canonical metadata copy — single source of truth for head + JSON-LD. */
export const SEARCH_TITLE =
  `${PERSON_NAME} - Frontend Software Engineer | Web Accessibility & Performance` as const;
export const SITE_DESCRIPTION =
  'Frontend engineer in Barcelona. Accessible, fast web products used by millions in 15+ countries. React, Next.js, Svelte, TypeScript.' as const;
export const SITE_KEYWORDS =
  'frontend software engineer, frontend developer, react developer, next.js developer, svelte developer, javascript developer, web accessibility, wcag, performance optimization, core web vitals, e-commerce development, design systems, user experience, typescript, tailwind css, barcelona' as const;

export const personSchema = {
  '@context': SCHEMA_CONTEXT,
  '@type': 'Person',
  name: PERSON_NAME,
  jobTitle: FRONTEND_DEVELOPER,
  email: CONTACT_EMAIL,
  url: SITE_URL,
  description: 'Frontend software engineer in Barcelona, building accessible, fast web products.',
  about:
    'Frontend engineer with 5+ years building web products used by millions across 15+ countries, focused on accessibility, performance and shared component libraries.',
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
    'WCAG 2.2',
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
  sameAs: [LINKEDIN_URL, GITHUB_URL, SITE_URL],
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
      ...(project.githubUrl && { sameAs: [project.githubUrl] }),
      keywords: project.technologies.map(technology => technology.name).join(', '),
    },
  })),
} as const;

/** Home-page breadcrumb; project pages build their own in `ProjectStructuredData`. */
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

/** FAQ section as schema.org `FAQPage`. */
export const faqSchema = {
  '@context': SCHEMA_CONTEXT,
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
} as const;
