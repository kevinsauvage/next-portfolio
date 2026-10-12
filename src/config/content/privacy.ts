/**
 * Privacy policy copy. Kept in `config/content` like every other page section;
 * the cookie table is rendered from `cookies.ts` at render time so this page and
 * the consent banner can never contradict each other.
 *
 * This is a good-faith description of how the site actually behaves: contact
 * form → EmailJS, analytics → GA4/GTM behind consent, errors → Sentry. Review it
 * whenever a provider, cookie or retention period changes — it is not legal
 * advice.
 */

export type PrivacyList = {
  /** Optional lead-in sentence rendered above the list. */
  intro?: string;
  items: string[];
};

export type PrivacySection = {
  /** Anchor id, also used by the table of contents. */
  id: string;
  /** Numbered heading, e.g. `4. Cookies and similar storage`. */
  title: string;
  /** Heading without its number, for the table of contents. */
  shortTitle: string;
  paragraphs?: string[];
  lists?: PrivacyList[];
  /** Renders the cookie category table built from `cookies.ts`. */
  cookieTable?: boolean;
  /** Renders the “Cookie settings” button that reopens the consent banner. */
  cookieSettings?: boolean;
  /** Renders the controller's email address. */
  contact?: boolean;
};

export type PrivacyConfig = {
  overline: string;
  title: string;
  /** Meta description for the route's `<head>`. */
  description: string;
  /** Machine-readable date for `<time dateTime>`; display copy is separate. */
  lastUpdated: string;
  lastUpdatedDisplay: string;
  lastUpdatedLabel: string;
  intro: string;
  contentsTitle: string;
  cookieTableCaption: string;
  cookieTableHeaders: {
    category: string;
    purpose: string;
    status: string;
  };
  cookieTableOptionalLabel: string;
  cookieSettingsLead: string;
  sections: PrivacySection[];
};

export const privacy: PrivacyConfig = {
  overline: 'Legal',
  title: 'Privacy Policy',
  description:
    'How this portfolio handles personal data: what is collected, why, which providers process it, how long it is kept, and the rights you have.',
  lastUpdated: '2026-10-12',
  lastUpdatedDisplay: '12 October 2026',
  lastUpdatedLabel: 'Last updated',
  intro:
    'This portfolio is a small personal site, and it collects very little. This page explains exactly what happens to your data, in plain language, and how to contact me about it.',
  contentsTitle: 'On this page',
  cookieTableCaption: 'Cookie and storage categories this site uses',
  cookieTableHeaders: {
    category: 'Category',
    purpose: 'Purpose',
    status: 'Status',
  },
  cookieTableOptionalLabel: 'Optional',
  cookieSettingsLead: 'Change your choice at any time with',
  sections: [
    {
      id: 'controller',
      title: '1. Who is responsible for your data',
      shortTitle: 'Who is responsible',
      paragraphs: [
        'The data controller — the person who decides why and how personal data is used here — is Kévin Sauvage, an individual based in Barcelona, Spain. This is a personal portfolio, not a company, and there is no Data Protection Officer because the site carries out no large-scale or systematic monitoring.',
        'For any question or request about your data, email me.',
      ],
      contact: true,
    },
    {
      id: 'data-collected',
      title: '2. What data is collected',
      shortTitle: 'What is collected',
      paragraphs: [
        'Reading the portfolio requires no account, no sign-up and no personal details. Data is only processed in the situations below.',
        'I never ask for sensitive information, and there is no database of visitors or contact messages stored on this site.',
      ],
      lists: [
        {
          intro: 'If you use the contact form:',
          items: [
            'Your name.',
            'Your email address, so I can reply.',
            'The content of your message.',
            'A reCAPTCHA score computed by Google to block automated spam.',
          ],
        },
        {
          intro: 'If you accept analytics cookies:',
          items: [
            'Pages viewed and the order in which you view them.',
            'How you reached the site (referrer or campaign parameters) and generic device, browser and screen information.',
            'Interactions such as scroll depth and clicks on links, buttons and the testimonials carousel.',
            'A randomly generated identifier Google Analytics 4 assigns to your browser.',
            'Coarse location derived from your IP address — Google Analytics 4 does not store the IP address itself.',
          ],
        },
        {
          intro: 'If something breaks while you are browsing:',
          items: [
            'Technical error details (message and stack trace), the page URL, and your browser’s user-agent string, sent to Sentry so I can fix the fault.',
          ],
        },
      ],
    },
    {
      id: 'purposes',
      title: '3. Why it is used, and on what legal basis',
      shortTitle: 'Why and on what basis',
      paragraphs: [
        'I never sell or rent your data, and I do not use it for advertising or profiling. Advertising storage exists in the cookie banner for completeness but stays off unless you deliberately turn it on.',
      ],
      lists: [
        {
          items: [
            'Contact form — to read and answer your message. Legal basis: your consent (sending the form) and my legitimate interest in replying to people who write to me.',
            'Analytics — to understand which projects and pages are useful so I can improve them. Legal basis: your consent, which you can withdraw at any time.',
            'Error monitoring — to detect and fix technical faults and keep the site secure. Legal basis: my legitimate interest in a working, safe website.',
            'Spam protection — reCAPTCHA scores form submissions to filter out bots. Legal basis: my legitimate interest in protecting the site from abuse.',
          ],
        },
      ],
    },
    {
      id: 'cookies',
      title: '4. Cookies and similar storage',
      shortTitle: 'Cookies',
      paragraphs: [
        'Cookies and local storage keep the site working and, only with your permission, measure traffic. Nothing optional loads before you accept: analytics and advertising tags stay off until you make a choice, and you can change that choice whenever you like.',
      ],
      cookieTable: true,
      lists: [
        {
          intro: 'Storage this site can set:',
          items: [
            'localConsent — remembers your cookie choice (strictly necessary, up to 6 months, following the CNIL recommendation).',
            '_ga and _ga_* — Google Analytics 4 measurement identifiers (analytics, up to 13 months, only after you accept).',
            '_gcl_au — Google Ads conversion storage (advertising, up to 90 days, only if you enable the advertising category).',
          ],
        },
      ],
      cookieSettings: true,
    },
    {
      id: 'processors',
      title: '5. Who else handles your data',
      shortTitle: 'Who else handles it',
      paragraphs: [
        'As a solo project I rely on a few service providers. They act only on my instructions, are bound by their own data processing terms, and receive nothing beyond what their service needs.',
      ],
      lists: [
        {
          items: [
            'Vercel — hosting and delivery of the site.',
            'Google — Google Tag Manager, Google Analytics 4 and reCAPTCHA.',
            'Sentry — error and performance monitoring.',
            'EmailJS — delivery of contact-form messages to my inbox.',
            'Microsoft — Outlook is where form messages and email land.',
          ],
        },
      ],
    },
    {
      id: 'transfers',
      title: '6. Transfers outside the EEA',
      shortTitle: 'International transfers',
      paragraphs: [
        'Some of these providers are based in the United States, so data can leave the European Economic Area. Those transfers rely on the European Commission’s Standard Contractual Clauses and, where applicable, the EU–US Data Privacy Framework.',
      ],
    },
    {
      id: 'retention',
      title: '7. How long data is kept',
      shortTitle: 'Retention',
      paragraphs: [
        'I keep data only as long as it is useful, then delete it. You can always ask me to delete something sooner — see your rights below.',
      ],
      lists: [
        {
          items: [
            'Contact messages — up to 24 months in my mailbox, then deleted.',
            'Analytics — up to 14 months, the longest retention Google Analytics 4 allows.',
            'Error reports — up to 90 days in Sentry.',
            'Your cookie choice — up to 6 months, after which the banner asks again.',
          ],
        },
      ],
    },
    {
      id: 'rights',
      title: '8. Your rights',
      shortTitle: 'Your rights',
      paragraphs: [
        'If you are in the European Economic Area or the United Kingdom, the GDPR gives you the following rights over your personal data:',
      ],
      lists: [
        {
          items: [
            'Access — get a copy of the personal data I hold about you.',
            'Rectification — have inaccurate data corrected.',
            'Erasure — have your data deleted (the “right to be forgotten”).',
            'Restriction — ask me to stop using your data while a question is being resolved.',
            'Objection — object to processing based on my legitimate interest.',
            'Portability — receive the data you provided in a machine-readable format.',
            'Withdraw consent — change or revoke your cookie choice at any time with the cookie settings button; this does not affect processing that happened before.',
          ],
        },
      ],
    },
    {
      id: 'contact-rights',
      title: '9. Exercising your rights',
      shortTitle: 'Exercising your rights',
      paragraphs: [
        'Email me to exercise any of these rights and I will answer within 30 days. If you are unhappy with my response you can lodge a complaint with your national supervisory authority — in Spain the AEPD (aepd.es), in France the CNIL (cnil.fr), or the equivalent body where you live.',
      ],
      contact: true,
    },
    {
      id: 'security',
      title: '10. Security',
      shortTitle: 'Security',
      paragraphs: [
        'The site is served over HTTPS and applies a strict Content Security Policy, and secrets such as API keys stay on the server. No system is perfect, so the safest protection is still to collect as little as possible: there is no database of visitors or contact messages on this site.',
      ],
    },
    {
      id: 'children',
      title: '11. Children',
      shortTitle: 'Children',
      paragraphs: [
        'This is a professional portfolio, not a service aimed at children, and I do not knowingly collect data from anyone under 16. If you believe a child has sent me personal data, email me and I will delete it.',
      ],
    },
    {
      id: 'changes',
      title: '12. Changes to this policy',
      shortTitle: 'Changes to this policy',
      paragraphs: [
        'When this policy changes, the “last updated” date at the top changes with it, and the site’s public repository history keeps a record of what was modified. Continuing to use the site after an update means you accept the revised policy.',
      ],
    },
  ],
};
