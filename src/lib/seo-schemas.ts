export const SITE_URL = 'https://www.kevin-sauvage.com' as const;
export const PERSON_NAME = 'Kévin Sauvage' as const;
export const FRONTEND_DEVELOPER = 'Frontend Software Engineer' as const;
export const SCHEMA_CONTEXT = 'https://schema.org' as const;

export const personSchema = {
  '@context': SCHEMA_CONTEXT,
  '@type': 'Person',
  name: PERSON_NAME,
  jobTitle: FRONTEND_DEVELOPER,
  email: 'contact@kevin-sauvage.com',
  url: SITE_URL,
  description: 'Developing performance-focused, inclusive web products that leave no one behind.',
  about:
    'I specialize in building high-performance web applications with a focus on accessibility and inclusivity. Passionate about delivering seamless experiences to users of all abilities.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ES',
    addressLocality: 'Spain',
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
  description: `Portfolio website of ${PERSON_NAME}, Frontend Software Engineer`,
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
