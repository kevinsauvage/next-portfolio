import type { MetadataRoute } from 'next';

import { siteRoutes } from '@/config/routes';
import { SITE_URL } from '@/lib/seo-schemas';

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map(route => ({
    changeFrequency: route.changeFrequency,
    lastModified: new Date(route.lastModified),
    priority: route.priority,
    url: `${SITE_URL}${route.path === '/' ? '' : route.path}`,
  }));
}
