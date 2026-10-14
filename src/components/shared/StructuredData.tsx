import JsonLd from '@/components/shared/JsonLd';
import { layout as siteContent } from '@/config/content';
import { SITE_URL } from '@/config/site';
import {
  breadcrumbSchema,
  personSchema,
  professionalServiceSchema,
  projectsSchema,
  SCHEMA_CONTEXT,
  websiteSchema,
} from '@/lib/seo-schemas';

const siteNavigation = {
  '@context': SCHEMA_CONTEXT,
  '@type': 'SiteNavigationElement',
  name: siteContent.header.navigation.items.map(item => item.label),
  url: siteContent.header.navigation.items.map(item => `${SITE_URL}${item.href}`),
} as const;

const schemas = [
  personSchema,
  websiteSchema,
  professionalServiceSchema,
  projectsSchema,
  breadcrumbSchema,
  siteNavigation,
];

const StructuredData = () => <JsonLd data={schemas} />;

export default StructuredData;
