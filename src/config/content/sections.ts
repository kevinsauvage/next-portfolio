export const sections = {
  hero: {
    title: {
      firstLine: 'Building Fast,',
      secondLine: 'Accessible Web Apps',
    },
    description:
      "Frontend Software Engineer shipping high-performance web products used by millions across 15+ countries — including Decathlon's e-commerce platforms. Specialised in React.js, Next.js, Svelte.js, and TypeScript, with deep expertise in accessibility, automated testing, and scalable component architecture.",
    availability: 'Available for new projects',
  },
  about: {
    overline: 'About me',
    title: "Hi, I'm Kévin Sauvage",
    experience: '5+ Years Experience',
    description:
      "I'm a Frontend Software Engineer with 5+ years shipping high-performance web products used by millions across 15+ countries — including Decathlon's e-commerce platforms in Europe. I'm specialised in React.js, Next.js, Svelte.js, and TypeScript, with deep expertise in accessibility, automated testing, and scalable component architecture. I'm comfortable owning features end-to-end in fast-moving Agile teams. Barcelona-based, I'm fluent in English, French, and Spanish.",
  },
  expertise: {
    overline: 'Expertise',
    title: 'What I Do Best',
    description:
      'Services to help your business online, from custom development to optimization and ongoing support. I work with modern technologies to build applications that are fast, accessible, and easy to use.',
  },
  career: {
    overline: 'Career',
    title: 'Professional Journey',
    description:
      'Growing through roles focused on quality and creating better user experiences. From building component libraries to optimizing performance, each role has taught me something new about building great web applications.',
  },
  portfolio: {
    overline: 'Portfolio',
    title: 'Featured Projects',
    description:
      'Modern web development in action. Each project focuses on speed, accessibility, and good user experience. These examples show how I approach real-world challenges and deliver working solutions.',
    buttons: {
      viewLive: 'View Live',
      sourceCode: 'Source Code',
    },
  },
  testimonials: {
    overline: 'Testimonials',
    title: 'What Colleagues Say',
    description:
      'What colleagues and managers say about working with me. These testimonials reflect the collaborative approach and technical skills I bring to each project.',
  },
  contact: {
    overline: 'Contact',
    title: "Let's build something great",
    description:
      "Have a project or challenge? I'd love to hear about it. Let's discuss how we can work together to build something that meets your needs and exceeds your expectations.",
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
      'Staying current with industry practices and new technologies through continuous learning. These certifications and achievements show my commitment to growing as a developer and staying up-to-date with the latest tools and techniques.',
    button: 'View Credential',
  },
} as const;

export type SectionsConfig = typeof sections;
