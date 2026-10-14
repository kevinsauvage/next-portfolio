export const sections = {
  hero: {
    title: {
      firstLine: 'Frontend Software Engineer ·',
      secondLine: 'Web Accessibility & Performance',
    },
    description:
      'Working remotely at Keolis, previously Decathlon e-commerce across 15+ markets. I build accessible, high-performance storefronts and design systems with React, Next.js and Svelte.',
    availability: 'Currently at Keolis Group',
  },
  about: {
    overline: 'About me',
    title: "Hi, I'm Kévin Sauvage",
    experience: '5+ Years Experience',
    currently: 'Currently at Keolis Group (remote) — accessibility, axe in CI',
    description: `Frontend engineer with 5+ years building web products used by millions of people across 15+ countries. Most of my work is on accessibility, performance and shared component libraries.

At Keolis I took ilévia, a French public transit platform, from 30% to 84% RGAA compliance and added accessibility checks (Jest-axe, Cypress-axe, ESLint jsx-a11y) to CI so regressions don't reach production.

At Decathlon I built the Svelte component library behind the storefronts in 15+ countries and cut load time on the Spanish site by 1.5s through Core Web Vitals work.

Stack: React, Next.js, TypeScript, Svelte, Jest, Cypress, Storybook.

Based in Barcelona, fluent in English, French and Spanish.`,
    languagesTitle: 'Languages',
    languages: [
      { language: 'French', level: 'Native' },
      {
        language: 'English',
        level: 'C1 Certified',
        credentialUrl: 'https://cert.efset.org/W8vpXL',
      },
      { language: 'Spanish', level: 'Fluent' },
    ],
  },
  expertise: {
    overline: 'Expertise',
    title: 'What I Do Best',
    description:
      'Where I am strongest in a product team: building from scratch or improving what already exists. I work with modern tools to build things that are fast, accessible and easy to use.',
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
      caseStudy: 'Read case study',
    },
    caseStudy: {
      overline: 'Case study',
      overview: 'Overview',
      overviewTitle: 'The problem & the approach',
      responsibilities: 'What I owned',
      featuresOverline: 'Product',
      featuresTitle: 'What it does',
      engineeringOverline: 'Engineering',
      engineeringTitle: 'How it is built',
      qualityOverline: 'Quality',
      qualityTitle: 'Tested, typed and accessible',
      qualityCaption: 'Quality & delivery',
      galleryOverline: 'Screens',
      galleryTitle: 'Product walkthrough',
      ctaTitle: 'Want to see it live?',
      ctaDescription:
        'The store is live: browse the catalog, switch language and add to cart. The source code is private, so I am happy to walk through it on a call.',
      backCta: 'Back to portfolio',
    },
  },
  testimonials: {
    overline: 'Testimonials',
    title: 'What Colleagues Say',
    description: 'A few words from colleagues and managers I have had the chance to work with.',
  },
  contact: {
    overline: 'Contact',
    title: "Let's connect",
    description:
      'Based in Barcelona, working remotely at Keolis Group. Always open to interesting conversations and opportunities — feel free to reach out.',
    email: 'kevinsauvage@outlook.com',
    location: 'Barcelona, Spain — CET (UTC+1) · English, French, Spanish',
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
  faq: {
    overline: 'FAQ',
    title: 'Questions, Answered',
    description:
      'The things people usually ask before getting in touch — answered upfront so you don’t have to.',
  },
  certifications: {
    overline: 'Credentials',
    title: 'Continuous Learning',
    description:
      'Production work is my main credential — these formalize the rest. Right now that means accessibility depth, JavaScript fundamentals, and working across three languages.',
    button: 'View Credential',
  },
} as const;

export type SectionsConfig = typeof sections;
