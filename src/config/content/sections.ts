export const sections = {
  hero: {
    title: {
      firstLine: 'Building Fast,',
      secondLine: 'Accessible Web Apps',
    },
    description:
      'A Frontend Developer who builds fast, accessible applications with React, Next.js and TypeScript. I focus on creating solutions that work well for users and help businesses grow online.',
    availability: 'Available for new projects',
  },
  about: {
    overline: 'About me',
    title: "Hi, I'm Kévin Sauvage",
    experience: '4+ Years Experience',
    description:
      "I'm Kévin, a Frontend Developer in Barcelona who turns complex problems into simple, fast, accessible solutions. With over four years of experience building React and Next.js applications, I've learned that the best code is the kind that disappears, letting users focus on what they came to do, not fighting with slow loading times or broken interfaces.",
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
