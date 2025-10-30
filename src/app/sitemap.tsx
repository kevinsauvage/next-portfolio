const BASE_URL = 'https://www.kevin-sauvage.com';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: 'monthly',
      priority: 1,
      lastModified: new Date(),
      url: BASE_URL,
    },
  ];
}
