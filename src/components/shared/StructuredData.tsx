import { layout as siteContent } from '@/config/content';
import { personSchema, professionalServiceSchema, websiteSchema } from '@/lib/seo-schemas';

const StructuredData = () => {
  const siteNavigation = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: siteContent.header.navigation.items.map(i => i.label),
    url: siteContent.header.navigation.items.map(i => `https://www.kevin-sauvage.com/${i.href}`),
  } as const;

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigation) }}
      />
    </>
  );
};

export default StructuredData;
