import { PERSON_NAME } from '@/config/site';

const navigationItems = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#career', label: 'Career' },
  { href: '/#testimonials', label: 'Testimonials' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/#certifications', label: 'Certifications' },
  { href: '/#contact', label: 'Contact' },
] as const;

const resumeLabel = 'Resume';

/** `'/#about'` → `'about'`. */
export const sectionIdFromHref = (href: string): string => href.replace(/^\/#/, '');

export const layout = {
  header: {
    /** Public path to PDF in `/public` */
    resumeHref: '/kevin_sauvage_resume.pdf',
    ctaButton: resumeLabel,
    mobileMenu: {
      title: 'Navigation',
      subtitle: 'Explore my portfolio',
      closeButton: 'Close menu',
      openButton: 'Open menu',
      ctaButton: resumeLabel,
    },
    navigation: {
      items: navigationItems,
    },
  },
  footer: {
    name: PERSON_NAME,
    tagline:
      'Frontend Software Engineer at Keolis Group (remote), based in Barcelona. I build fast, accessible web products that people enjoy using.',
    sections: {
      quickLinks: {
        title: 'Quick Links',
        links: [
          ...navigationItems.map(({ href, label }) => ({ href, name: label })),
          { name: 'Privacy', href: '/privacy' },
        ],
      },
      techStack: {
        title: 'Tech Stack',
        skills: [
          'React',
          'Next.js',
          'Svelte',
          'TypeScript',
          'Tailwind CSS',
          'Testing Library',
          'Jest',
          'Cypress',
          'axe',
          'WCAG 2.2',
          'Storybook',
          'Figma',
        ],
      },
      availability: {
        title: 'Availability',
        status: 'Currently at Keolis Group — open to connections',
        location: 'Barcelona, Spain',
      },
      contact: {
        title: 'Get in Touch',
        description: 'Feel free to reach out to connect or just to say hello.',
      },
    },
    copyright: 'All rights reserved.',
  },
} as const;

export const NAVIGATION_SECTION_IDS = navigationItems.map(({ href }) => sectionIdFromHref(href));
