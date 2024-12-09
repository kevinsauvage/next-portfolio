const BASE_URL = 'https://www.kevin-sauvage.com';
const LANGUAGES = ['en', 'fr', 'es'];

export default async function sitemap() {
  return LANGUAGES.map((lang) => {
    return {
      lastModified: new Date().toISOString(),
      url: `${BASE_URL}/${lang}`,
    };
  });
}
