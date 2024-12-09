import { locales } from '@/middleware';

const BASE_URL = 'https://www.kevin-sauvage.com';

export default async function sitemap() {
  return locales.map((lang) => {
    return {
      lastModified: new Date().toISOString(),
      url: `${BASE_URL}/${lang}`,
    };
  });
}
