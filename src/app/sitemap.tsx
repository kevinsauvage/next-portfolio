import type { MetadataRoute } from 'next';

import { projects } from '@/config/content/projects';
import { SITE_LAST_MODIFIED, SITE_URL } from '@/lib/seo-schemas';

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries: MetadataRoute.Sitemap = projects.map(({ slug }) => ({
    changeFrequency: 'yearly',
    lastModified: new Date(SITE_LAST_MODIFIED),
    priority: 0.8,
    url: `${SITE_URL}/projects/${slug}`,
  }));

  return [
    {
      changeFrequency: 'monthly',
      lastModified: new Date(SITE_LAST_MODIFIED),
      priority: 1,
      url: SITE_URL,
    },
    ...projectEntries,
  ];
}
