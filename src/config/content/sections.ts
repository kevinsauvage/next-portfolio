export const sections = {
  hero: {
    title: {
      firstLine: 'Building Fast,',
      secondLine: 'Accessible Web Apps',
    },
    description:
      "I build fast, accessible web products used by millions across 15+ countries, including Decathlon's e-commerce platforms. My stack is React, Next.js, Svelte and TypeScript, with a strong focus on accessibility, testing and scalable component architecture.",
    availability: 'Available for new projects',
  },
  about: {
    overline: 'About me',
    title: "Hi, I'm Kévin Sauvage",
    experience: '5+ Years Experience',
    description:
      "I've spent 5+ years building web products used by millions across 15+ countries, including Decathlon's e-commerce platforms in Europe. I mostly work with React, Next.js, Svelte and TypeScript, and I care a lot about accessibility, testing and keeping codebases maintainable. I'm comfortable owning features from start to finish in fast-moving teams. Based in Barcelona, I work fluently in English, French and Spanish.",
  },
  expertise: {
    overline: 'Expertise',
    title: 'What I Do Best',
    description:
      'Whether you need something built from scratch or want to improve what you already have, I can help. I work with modern tools to build things that are fast, accessible and easy to use.',
  },
  career: {
    overline: 'Career',
    title: 'Professional Journey',
    description:
      "Each role I've had has pushed me in a different direction. From building component libraries to tuning performance and accessibility, every step has made me a more well-rounded engineer.",
  },
  portfolio: {
    overline: 'Portfolio',
    title: 'Featured Projects',
    description:
      "Here are some projects I've worked on. Each one is focused on speed, accessibility and real usability, and reflects how I think through problems and build things that hold up in production.",
    buttons: {
      viewLive: 'View Live',
      sourceCode: 'Source Code',
    },
  },
  testimonials: {
    overline: 'Testimonials',
    title: 'What Colleagues Say',
    description: 'A few words from colleagues and managers I have had the chance to work with.',
  },
  contact: {
    overline: 'Contact',
    title: "Let's build something great",
    description:
      "Got a project or just want to chat? Tell me what you are working on and let's see if we would be a good fit.",
    features: {
      quickResponse: {
        title: 'Quick Response',
        description: 'I typically reply within 24 hours on weekdays',
      },
      directContact: {
        title: 'Direct Contact',
        description: "Fill out the form and I'll get back to you soon",
      },
    },
  },
  certifications: {
    overline: 'Continuous Learning',
    title: 'Certifications & Achievements',
    description:
      'I like keeping up with new tools and practices. These are a few certifications I have picked up along the way.',
    button: 'View Credential',
  },
} as const;

export type SectionsConfig = typeof sections;
