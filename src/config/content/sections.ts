export const sections = {
  hero: {
    title: {
      firstLine: 'Crafting High-Performance',
      secondLine: 'Accessible Web Experiences',
    },
    description:
      'A Frontend Developer specializing in transforming complex challenges into fast, intuitive, and inclusive applications with React, Next.js and TypeScript.',
    availability: 'Available for new projects',
  },
  about: {
    overline: 'About me',
    title: "Hi, I'm Kévin Sauvage",
    experience: '4+ Years Experience',
    description:
      "I'm a Frontend Developer in Barcelona, crafting high-performance, accessible web applications. With over four years of experience, I specialize in building modern solutions with React and Next.js that are both user-centric and robust.",
  },
  expertise: {
    overline: 'Expertise',
    title: 'What I Do Best',
    description:
      'Specialized services to help your business thrive online, from custom development to optimization and ongoing support.',
  },
  career: {
    overline: 'Career',
    title: 'Professional Journey',
    description:
      'Evolving through roles dedicated to innovation, quality, and the relentless pursuit of better user experiences.',
  },
  portfolio: {
    overline: 'Portfolio',
    title: 'Featured Projects',
    description:
      'Translating modern web practices into tangible results. Each project is built with a focus on speed, accessibility, and creating meaningful user interactions.',
    buttons: {
      viewLive: 'View Live',
      sourceCode: 'Source Code',
    },
  },
  testimonials: {
    overline: 'Testimonials',
    title: 'What Colleagues Say',
    description: "Notes from engineering leaders and colleagues I've worked with.",
  },
  contact: {
    overline: 'Contact',
    title: "Let's build something great",
    description:
      "Have a project or challenge? I'd love to hear about it. Let's discuss how we can build, improve, or innovate together.",
    features: {
      quickResponse: {
        title: 'Quick Response',
        description: 'I typically respond within 24 hours during weekdays',
      },
      directContact: {
        title: 'Direct Contact',
        description: "Fill out the form below and I'll get back to you soon",
      },
    },
  },
  certifications: {
    overline: 'Continuous Learning',
    title: 'Certifications & Achievements',
    description:
      'Committed to staying current with industry best practices and emerging technologies through continuous education and professional development.',
    button: 'View Credential',
  },
} as const;

export type SectionsConfig = typeof sections;
