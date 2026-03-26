export const layout = {
  header: {
    /** Public path to PDF in `/public` */
    resumeHref: '/kevin_sauvage_resume.pdf',
    ctaButton: 'Resume',
    mobileMenu: {
      title: 'Navigation',
      subtitle: 'Explore my portfolio',
      closeButton: 'Close menu',
      openButton: 'Open menu',
      ctaButton: 'Resume',
    },
    navigation: {
      items: [
        { href: '#home', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#portfolio', label: 'Portfolio' },
        { href: '#career', label: 'Career' },
        { href: '#certifications', label: 'Certifications' },
        { href: '#testimonials', label: 'Testimonials' },
        { href: '#contact', label: 'Contact' },
      ],
    },
  },
  footer: {
    name: 'Kévin Sauvage',
    tagline:
      "I build fast, accessible web products that people enjoy using. If you have a project in mind, let's talk.",
    sections: {
      quickLinks: {
        title: 'Quick Links',
        links: [
          { name: 'About', href: '#about' },
          { name: 'Portfolio', href: '#portfolio' },
          { name: 'Career', href: '#career' },
          { name: 'Testimonials', href: '#testimonials' },
          { name: 'Contact', href: '#contact' },
        ],
      },
      techStack: {
        title: 'Tech Stack',
        skills: [
          'React',
          'Next.js',
          'Svelte',
          'TypeScript',
          'JavaScript',
          'Tailwind CSS',
          'HTML5',
          'CSS3',
          'Node.js',
          'Express',
          'Prisma',
          'MongoDB',
          'Jest',
          'Cypress',
          'Vitest',
          'Testing Library',
          'Jest-axe',
          'Cypress-axe',
          'WCAG 2.1',
          'Git',
          'Figma',
          'Storybook',
          'Cursor',
          'Claude',
        ],
      },
      availability: {
        title: 'Availability',
        status: 'Open to opportunities',
        location: 'Barcelona, Spain',
      },
      contact: {
        title: 'Get in Touch',
        description: 'Feel free to reach out for projects or just to say hello.',
      },
    },
    copyright: 'All rights reserved.',
  },
} as const;

export type LayoutConfig = typeof layout;
