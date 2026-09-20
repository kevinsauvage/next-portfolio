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
        { href: '/#home', label: 'Home' },
        { href: '/#about', label: 'About' },
        { href: '/#career', label: 'Career' },
        { href: '/#testimonials', label: 'Testimonials' },
        { href: '/#portfolio', label: 'Portfolio' },
        { href: '/#certifications', label: 'Certifications' },
        { href: '/#contact', label: 'Contact' },
      ],
    },
  },
  footer: {
    name: 'Kévin Sauvage',
    tagline:
      'Frontend Engineer at Keolis Group (remote), based in Barcelona. I build fast, accessible web products that people enjoy using.',
    sections: {
      quickLinks: {
        title: 'Quick Links',
        links: [
          { name: 'Home', href: '/#home' },
          { name: 'About', href: '/#about' },
          { name: 'Career', href: '/#career' },
          { name: 'Testimonials', href: '/#testimonials' },
          { name: 'Portfolio', href: '/#portfolio' },
          { name: 'Certifications', href: '/#certifications' },
          { name: 'Contact', href: '/#contact' },
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
          'Vitest',
          'Cypress',
          'axe',
          'WCAG 2.1',
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

export type LayoutConfig = typeof layout;
