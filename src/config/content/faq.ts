type Faq = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    id: 'availability',
    question: 'Are you available for new opportunities?',
    answer:
      "I'm currently a Frontend Engineer at Keolis Group, working remotely from Barcelona — and I'm always open to connections and interesting conversations. The fastest way to reach me is the contact form or email below; I reply within 24 hours on weekdays.",
  },
  {
    id: 'freelance',
    question: 'Do you take on freelance projects?',
    answer:
      "My day-to-day focus is my full-time role at Keolis, so I only consider small, well-scoped collaborations — audits, code reviews, or mentoring. Tell me what you have in mind and I'll give you a straight answer.",
  },
  {
    id: 'stack',
    question: "What's your core stack?",
    answer:
      'React, Next.js, Svelte, and TypeScript, with Tailwind CSS, Storybook, and testing built on Vitest, Cypress, and axe. My specialties are accessible e-commerce at scale, design systems, and Core Web Vitals performance.',
  },
  {
    id: 'closed-source',
    question: 'Most of your work is closed-source — can you still talk about it?',
    answer:
      'Yes. Decathlon and Keolis work is proprietary, but I can walk through NDA-friendly summaries: architecture decisions, metrics like the −1.5s LCP improvement, and lessons learned. Just ask.',
  },
  {
    id: 'location-languages',
    question: 'Where are you based, and which languages do you work in?',
    answer:
      'Barcelona, Spain (CET, UTC+1), working remotely. I work in French (native), English (C1 certified), and Spanish (native) — comfortable in multicultural, distributed teams.',
  },
];

export default faqs;
