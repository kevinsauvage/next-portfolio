import type { Metadata } from 'next';

import { PERSON_NAME, SEARCH_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS } from '@/lib/seo-schemas';

export function buildRootMetadata(baseUrl: string): Metadata {
  return {
    alternates: {
      canonical: baseUrl,
    },
    authors: [{ name: PERSON_NAME }],
    category: 'Technology',
    creator: PERSON_NAME,
    description: SITE_DESCRIPTION,
    generator: 'Next.js',
    keywords: SITE_KEYWORDS,
    metadataBase: new URL(baseUrl),
    openGraph: {
      description: SITE_DESCRIPTION,
      locale: 'en_US',
      siteName: SEARCH_TITLE,
      title: SEARCH_TITLE,
      type: 'website',
      url: baseUrl,
    },
    publisher: PERSON_NAME,
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
      index: true,
    },
    title: {
      default: SEARCH_TITLE,
      template: `%s | ${PERSON_NAME}`,
    },
    twitter: {
      card: 'summary_large_image',
      description: SITE_DESCRIPTION,
      title: SEARCH_TITLE,
    },
    verification: {
      google: process.env['GOOGLE_SITE_VERIFICATION'],
    },
  };
}
