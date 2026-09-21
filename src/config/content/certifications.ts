type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  featured?: boolean;
};

export const certifications: Certification[] = [
  {
    id: 'now-learning-accessibility-2026',
    title: 'Deepening Web Accessibility',
    issuer: 'Self-directed · In Progress',
    date: '2026',
    description:
      'Going deeper on WCAG 2.2, ARIA authoring practices, and screen-reader testing — applied directly to Keolis delivery and axe-gated CI pipelines.',
    skills: ['WCAG 2.2', 'ARIA', 'Screen Readers'],
    featured: true,
  },
  {
    id: 'ef-set-c1-english-certificate-2024',
    title: 'C1 English Certificate',
    issuer: 'EF SET',
    date: 'March 2024',
    description:
      'Official C1 Advanced English certification for professional communication in international environments.',
    credentialUrl: 'https://cert.efset.org/W8vpXL',
    skills: ['C1 Advanced English', 'International Collaboration'],
  },
  {
    id: 'linkedin-react-using-typescript-2023',
    title: 'React: Using TypeScript',
    issuer: 'LinkedIn Learning',
    date: 'November 2023',
    description:
      'Course on building type-safe React applications with TypeScript — props, hooks, and patterns for complex front-ends.',
    credentialUrl:
      'https://www.linkedin.com/learning/certificates/40fd79658af09c1bdbf16e99974debccb5b541758ce2d58f71bdb0dfc323722e',
    skills: ['React', 'TypeScript', 'Type Safety'],
  },
  {
    id: 'udemy-advanced-javascript-2021',
    // eslint-disable-next-line no-restricted-syntax
    title: 'JavaScript: The Advanced Concepts',
    issuer: 'Udemy',
    date: '2021',
    description:
      'Advanced JavaScript course covering closures, prototypes, async programming, and modern ES6+ features for complex applications.',
    credentialId: 'UC-833af855-7179-4c4e-903a-98172c7e4964',
    credentialUrl: 'https://www.udemy.com/certificate/UC-833af855-7179-4c4e-903a-98172c7e4964/',
    skills: ['Closures & Prototypes', 'Async Patterns', 'ES6+'],
  },
  {
    id: 'le-wagon-full-stack-web-developer-2020',
    title: 'Full-Stack Web Developer Bootcamp',
    issuer: 'Le Wagon',
    date: '2020',
    description:
      'Where I started: 9-week intensive bootcamp covering Ruby on Rails and JavaScript. Since then, 5+ years of production React, Svelte, and Next.js work.',
    credentialUrl: '/fullstack-certificate-Kevin-sauvage.pdf',
    skills: ['Full-Stack Foundations', 'Ruby on Rails', 'JavaScript'],
  },
];

export default certifications;
