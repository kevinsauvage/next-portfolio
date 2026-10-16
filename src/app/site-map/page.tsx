import type { Metadata } from 'next';

import SiteMap from '@/components/features/legal/SiteMap';
import { siteMap } from '@/config/content';
import { PERSON_NAME, SITE_URL } from '@/config/site';

const url = `${SITE_URL}/site-map`;

export const metadata: Metadata = {
  alternates: { canonical: url },
  description: siteMap.description,
  openGraph: {
    description: siteMap.description,
    title: `${siteMap.title} | ${PERSON_NAME}`,
    type: 'website',
    url,
  },
  title: siteMap.title,
  twitter: {
    card: 'summary',
    description: siteMap.description,
    title: `${siteMap.title} | ${PERSON_NAME}`,
  },
};

const Page = () => <SiteMap />;

export default Page;
