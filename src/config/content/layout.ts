export const layout = {
  header: {
    ctaButton: 'Get in touch',
    mobileMenu: {
      title: 'Navigation',
      subtitle: 'Explore my portfolio',
      closeButton: 'Close menu',
      openButton: 'Open menu',
      ctaButton: 'Get in Touch',
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
      "Frontend Software Engineer building scalable, high-performance web products. Let's work together on your next project.",
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
