export default function robots() {
  return {
    rules: {
      allow: '/',
      crawlDelay: 86_400, // 60*60*24
      disallow: '',
      userAgent: '*',
    },
    sitemap: 'https://www.kevin-sauvage.com/sitemap.xml',
  };
}
