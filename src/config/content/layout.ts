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
      "Frontend Developer building modern web applications. Let's work together on your next project.",
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
          'HTML',
          'CSS',
          'Tailwind CSS',
          'Sass',
          'Node.js',
          'Express',
          'Redux',
          'REST API',
          'GraphQL',
          'MongoDB',
          'PostgreSQL',
          'Jest',
          'Git',
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
