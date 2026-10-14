import type { Metadata } from 'next';

import PrivacyPolicy from '@/components/features/legal/PrivacyPolicy';
import { privacy } from '@/config/content';
import { PERSON_NAME, SITE_URL } from '@/lib/seo-schemas';

const url = `${SITE_URL}/privacy`;

export const metadata: Metadata = {
  alternates: { canonical: url },
  description: privacy.description,
  openGraph: {
    description: privacy.description,
    title: `${privacy.title} | ${PERSON_NAME}`,
    type: 'website',
    url,
  },
  title: privacy.title,
  twitter: {
    card: 'summary',
    description: privacy.description,
    title: `${privacy.title} | ${PERSON_NAME}`,
  },
};

const PrivacyPage = () => <PrivacyPolicy />;

export default PrivacyPage;
