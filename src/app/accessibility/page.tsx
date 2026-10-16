import type { Metadata } from 'next';

import AccessibilityStatement from '@/components/features/legal/AccessibilityStatement';
import { accessibility } from '@/config/content';
import { PERSON_NAME, SITE_URL } from '@/config/site';

const url = `${SITE_URL}/accessibility`;

export const metadata: Metadata = {
  alternates: { canonical: url },
  description: accessibility.description,
  openGraph: {
    description: accessibility.description,
    title: `${accessibility.title} | ${PERSON_NAME}`,
    type: 'website',
    url,
  },
  title: accessibility.title,
  twitter: {
    card: 'summary',
    description: accessibility.description,
    title: `${accessibility.title} | ${PERSON_NAME}`,
  },
};

const Page = () => <AccessibilityStatement />;

export default Page;
