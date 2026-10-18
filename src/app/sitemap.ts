import type { MetadataRoute } from 'next';

import { getProjectUrl, projects } from '@/config/content/projects';
import { SITE_URL } from '@/config/site';
import { SITE_LAST_MODIFIED } from '@/lib/seo-schemas';

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = projects.map(({ slug }) => ({
    changeFrequency: 'yearly',
    lastModified: new Date(SITE_LAST_MODIFIED),
    priority: 0.8,
    url: getProjectUrl(slug),
  }));

  return [
    {
      changeFrequency: 'monthly',
      lastModified: new Date(SITE_LAST_MODIFIED),
      priority: 1,
      url: SITE_URL,
    },
    {
      changeFrequency: 'yearly',
      lastModified: new Date(SITE_LAST_MODIFIED),
      priority: 0.3,
      url: `${SITE_URL}/privacy`,
    },
    {
      changeFrequency: 'yearly',
      lastModified: new Date(SITE_LAST_MODIFIED),
      priority: 0.3,
      url: `${SITE_URL}/site-map`,
    },
    ...projectEntries,
  ];
}
