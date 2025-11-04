import type { Metadata } from 'next';

const PERSON_NAME = 'Kévin Sauvage' as const;
const PERSON_TITLE = `${PERSON_NAME} - Frontend Developer | React & Next.js Expert` as const;
const SITE_DESCRIPTION =
  'Experienced Frontend Developer specializing in React, Next.js, and accessibility-first design. Building scalable web applications for Decathlon International with 4+ years of expertise in performance optimization and user experience.' as const;

// eslint-disable-next-line sonarjs/max-lines-per-function
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
    keywords:
      'frontend developer, react expert, next.js developer, javascript developer, web accessibility, performance optimization, e-commerce development, user experience, typescript, tailwind css',
    metadataBase: new URL(baseUrl),
    openGraph: {
      description: SITE_DESCRIPTION,
      images: [
        {
          alt: PERSON_TITLE,
          height: 630,
          url: '/images/og-image.png',
          width: 1200,
        },
      ],
      locale: 'en_US',
      siteName: PERSON_TITLE,
      title: PERSON_TITLE,
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
      default: PERSON_TITLE,
      template: `%s | ${PERSON_NAME}`,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@kevinsauvage',
      description: SITE_DESCRIPTION,
      images: ['/images/og-image.png'],
      site: '@kevinsauvage',
      title: PERSON_TITLE,
    },
    verification: {
      google: process.env['GOOGLE_SITE_VERIFICATION'],
    },
  };
}
