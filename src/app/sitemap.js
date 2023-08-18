const BASE_URL = 'https://www.kevin-sauvage.com/';

export default async function sitemap() {
  return ['/'].map((route) => ({
    lastModified: new Date().toISOString(),
    url: `${BASE_URL}${route}`,
  }));
}
