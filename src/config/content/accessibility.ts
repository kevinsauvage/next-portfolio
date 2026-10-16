/**
 * Accessibility statement (RGAA 4.1 "déclaration d'accessibilité") and the
 * footer compliance mention, which must always read from the same `status`.
 *
 * RGAA rules: without a full audit of the representative sample the site must
 * be declared non-compliant. After an audit, set `status`, `complianceRate`
 * and `auditDate`, and fill the non-compliant criteria in `sections`.
 */
import { PERSON_NAME, SITE_URL } from '@/config/site';

export type ComplianceStatus = 'non-compliant' | 'partially-compliant' | 'fully-compliant';

export const COMPLIANCE_LABELS: Record<ComplianceStatus, string> = {
  'non-compliant': 'not compliant',
  'partially-compliant': 'partially compliant',
  'fully-compliant': 'fully compliant',
};

export type AccessibilityLink = { label: string; href: string };

export type AccessibilitySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
  links?: AccessibilityLink[];
  /** Renders the contact email address. */
  contact?: boolean;
};

export type AccessibilityConfig = {
  overline: string;
  title: string;
  description: string;
  status: ComplianceStatus;
  /** Percentage of applicable RGAA criteria met; `null` until audited. */
  complianceRate: number | null;
  /** Machine-readable date for `<time dateTime>`; display copy is separate. */
  establishedOn: string;
  establishedOnDisplay: string;
  establishedOnLabel: string;
  statusLabel: string;
  sections: AccessibilitySection[];
};

const status: ComplianceStatus = 'non-compliant';

export const accessibility: AccessibilityConfig = {
  overline: 'Legal',
  title: 'Accessibility statement',
  description: `RGAA 4.1 accessibility statement for ${SITE_URL}: compliance status, known limitations, how the site is tested and how to report a barrier.`,
  status,
  complianceRate: null,
  establishedOn: '2026-10-16',
  establishedOnDisplay: '16 October 2026',
  establishedOnLabel: 'Statement established on',
  statusLabel: 'Compliance status',
  sections: [
    {
      id: 'commitment',
      title: 'Commitment',
      paragraphs: [
        `${PERSON_NAME} is committed to making this website accessible to everyone, in line with the French accessibility framework RGAA 4.1 (Référentiel général d'amélioration de l'accessibilité), which is based on WCAG 2.1 level AA.`,
        `This statement applies to ${SITE_URL}.`,
      ],
    },
    {
      id: 'status',
      title: 'About this status',
      paragraphs: [
        // eslint-disable-next-line security/detect-object-injection -- keyed by a typed union
        `This website is ${COMPLIANCE_LABELS[status]} with RGAA 4.1: no full audit of the 106 criteria has been carried out yet, and RGAA requires a site to be declared non-compliant until one has.`,
        'Accessibility is nonetheless built in and checked continuously: automated WCAG 2.1 AA tests run on every page and every component in continuous integration, and currently report no violations. This statement will be updated with the audit results and the compliance rate as soon as the audit is complete.',
      ],
    },
    {
      id: 'limitations',
      title: 'Known limitations',
      items: [
        'The downloadable résumé (PDF) has not been checked for accessibility. An accessible text version is available on request by email.',
        'The contact form uses Google reCAPTCHA v3, a third-party service whose accessibility is outside my control. It runs invisibly and does not ask you to solve a challenge.',
      ],
    },
    {
      id: 'exempt',
      title: 'Content not covered by this statement',
      paragraphs: [
        'External websites linked from this site — LinkedIn, GitHub, certification platforms and live project demos — are not covered by this statement.',
      ],
    },
    {
      id: 'technologies',
      title: 'Technologies used',
      items: ['HTML', 'CSS', 'JavaScript', 'WAI-ARIA'],
    },
    {
      id: 'testing',
      title: 'How the site is tested',
      items: [
        'Automated WCAG 2.1 AA checks with axe-core on every page (Playwright) and every component (Vitest), in continuous integration.',
        'Linting with eslint-plugin-jsx-a11y.',
        'Manual keyboard navigation and focus checks.',
      ],
      paragraphs: [
        'Pages checked: home, project case studies, privacy policy, accessibility statement, site map and the error page. The browser and assistive technology combinations used for the audit will be listed here once it is complete.',
      ],
    },
    {
      id: 'feedback',
      title: 'Feedback and contact',
      paragraphs: [
        'If you cannot access a piece of content or a feature, please tell me: I will provide the information in another format and fix the issue.',
      ],
      contact: true,
    },
    {
      id: 'recourse',
      title: 'Recourse',
      paragraphs: [
        'If you reported an accessibility barrier and did not get a satisfactory answer, you can contact the Défenseur des droits (French rights ombudsman):',
      ],
      items: [
        'By post, free of charge: Défenseur des droits, Libre réponse 71120, 75342 Paris CEDEX 07, France.',
      ],
      links: [
        {
          label: 'Online contact form of the Défenseur des droits',
          href: 'https://formulaire.defenseurdesdroits.fr/',
        },
        {
          label: 'Find a Défenseur des droits delegate in your area',
          href: 'https://www.defenseurdesdroits.fr/carte-des-delegues',
        },
      ],
    },
  ],
};

/** Footer mention required on every page by RGAA, e.g. "Accessibility: not compliant". */

export const accessibilityFooterLabel = `Accessibility: ${COMPLIANCE_LABELS[accessibility.status]}`;
