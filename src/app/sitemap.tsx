const BASE_URL = 'https://www.kevin-sauvage.com';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      alternates: {
        languages: {
          en: `${BASE_URL}/en`,
          es: `${BASE_URL}/es`,
          fr: `${BASE_URL}/fr`,
        },
      },
      lastModified: new Date(),
      url: BASE_URL,
    },
  ];
}
