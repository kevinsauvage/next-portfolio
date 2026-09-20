import type { MetadataRoute } from 'next';

import { SITE_LAST_MODIFIED } from '@/lib/seo-schemas';

export type SiteRoute = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: MetadataRoute.Sitemap[number]['priority'];
  lastModified: string;
};

/**
 * Single source of truth for indexable routes.
 *
 * Bump `SITE_LAST_MODIFIED` (in `@/lib/seo-schemas`) when content changes.
 * Project detail routes can be appended here once they exist.
 */
export const siteRoutes: SiteRoute[] = [
  {
    changeFrequency: 'monthly',
    lastModified: SITE_LAST_MODIFIED,
    path: '/',
    priority: 1,
  },
];
