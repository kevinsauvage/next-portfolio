type Expertise = {
  slug: string;
  title: string;
  content: string;
  keyPoints: string[];
};

const expertise: Expertise[] = [
  {
    slug: 'web-app-development',
    title: 'Web App Development',
    content:
      'Building applications with React, Next.js, and TypeScript that scale with your business needs.',
    keyPoints: [
      'Custom React & Next.js Solutions',
      'Type-Safe Development',
      'Responsive & Accessible UI',
    ],
  },
  {
    slug: 'performance-optimization',
    title: 'Performance Optimization',
    content:
      'Making websites faster and more responsive to improve user experience and search rankings.',
    keyPoints: ['Core Web Vitals', 'Rendering & Load Optimization', 'Performance Auditing'],
  },
  {
    slug: 'e-commerce-solutions',
    title: 'E-Commerce Solutions',
    content:
      'Building online stores that convert visitors into customers with secure, scalable solutions.',
    keyPoints: ['Headless Architecture', 'Checkout & Funnel Optimization', 'Platform Integration'],
  },
  {
    slug: 'accessibility-a11y',
    title: 'Accessibility (a11y)',
    content:
      'Building websites and apps that work for everyone, including users with disabilities.',
    keyPoints: [
      'WCAG 2.1 Compliance',
      'Assistive Technology Support',
      'Keyboard & Focus Management',
    ],
  },
  {
    slug: 'seo-data-strategy',
    title: 'SEO & Data Strategy',
    content:
      'Setting up technical SEO and analytics to help your site rank better and track what works.',
    keyPoints: ['Technical SEO', 'Analytics Implementation', 'Data-Driven Iteration'],
  },
  {
    slug: 'maintenance-evolution',
    title: 'Maintenance & Evolution',
    content: 'Keeping your application secure, up-to-date, and running smoothly over time.',
    keyPoints: ['Proactive Updates & Security', 'Performance Monitoring', 'Continuous Improvement'],
  },
];
export default expertise;
