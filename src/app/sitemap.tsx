import type { MetadataRoute } from 'next';

import { SITE_LAST_MODIFIED, SITE_URL } from '@/lib/seo-schemas';

export default function sitemap(): MetadataRoute.Sitemap {
  // Single-page site: one canonical URL. Add entries here if detail routes
  // are introduced later.
  return [
    {
      changeFrequency: 'monthly',
      lastModified: new Date(SITE_LAST_MODIFIED),
      priority: 1,
      url: SITE_URL,
    },
  ];
}
