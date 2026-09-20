import { headers } from 'next/headers';

import { layout as siteContent } from '@/config/content';
import {
  breadcrumbSchema,
  personSchema,
  professionalServiceSchema,
  projectsSchema,
  SITE_URL,
  websiteSchema,
} from '@/lib/seo-schemas';

const StructuredData = async () => {
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  const siteNavigation = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: siteContent.header.navigation.items.map(i => i.label),
    url: siteContent.header.navigation.items.map(i => `${SITE_URL}${i.href}`),
  } as const;

  return (
    <>
      <script
        type='application/ld+json'
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type='application/ld+json'
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type='application/ld+json'
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type='application/ld+json'
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
      <script
        type='application/ld+json'
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type='application/ld+json'
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigation) }}
      />
    </>
  );
};

export default StructuredData;
