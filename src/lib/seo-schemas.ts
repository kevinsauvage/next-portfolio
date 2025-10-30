export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kévin Sauvage',
  jobTitle: 'Frontend Developer',
  email: 'contact@kevin-sauvage.com',
  url: 'https://www.kevin-sauvage.com',
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
    name: 'Frontend Developer',
    description: 'Frontend Developer specializing in React, Next.js, and web accessibility',
    occupationLocation: {
      '@type': 'Place',
      name: 'Decathlon International',
    },
  },
  knowsAbout: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Web Accessibility',
    'Frontend Development',
    'Performance Optimization',
    'HTML',
    'CSS',
    'Sass',
    'Tailwind CSS',
    'Responsive Design',
    'Progressive Web Apps',
    'Web Performance',
    'Web Development',
    'Internationalization',
    'SEO',
    'User Experience',
  ],
  sameAs: [
    'https://www.linkedin.com/in/kevin-sauvage',
    'https://github.com/kevinsauvage',
    'https://www.kevin-sauvage.com',
  ],
} as const;

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Kévin Sauvage - Portfolio',
  url: 'https://www.kevin-sauvage.com',
  author: {
    '@type': 'Person',
    name: 'Kévin Sauvage',
  },
  description: 'Portfolio website of Kévin Sauvage, Frontend Developer',
  inLanguage: 'en',
} as const;

export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Kévin Sauvage - Frontend Development Services',
  url: 'https://www.kevin-sauvage.com',
  description:
    'Professional frontend development services specializing in React, Next.js, and web accessibility',
  areaServed: 'Worldwide',
  serviceType: 'Frontend Development',
} as const;
