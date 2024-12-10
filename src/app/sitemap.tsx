const BASE_URL = 'https://www.kevin-sauvage.com';
import { routing } from '@/i18n/routing';

export default async function sitemap() {
  return routing.locales.map((lang) => {
    return {
      lastModified: new Date().toISOString(),
      url: `${BASE_URL}/${lang}`,
    };
  });
}
