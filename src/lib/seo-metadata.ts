import type { Metadata } from 'next';

const PERSON_NAME = 'Kévin Sauvage' as const;
const PERSON_TITLE =
  `${PERSON_NAME} - Frontend Engineer | React, Next.js, Svelte — Accessible E-commerce at Scale` as const;
const SITE_DESCRIPTION =
  "Frontend Engineer at Keolis Group with 5+ years shipping high-performance web products used by millions across 15+ countries — previously Decathlon's e-commerce platforms. Specialised in React, Next.js, Svelte, TypeScript, accessibility, and scalable component architecture." as const;

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
      'frontend developer, react expert, next.js developer, svelte developer, javascript developer, web accessibility, wcag, performance optimization, core web vitals, e-commerce development, design systems, user experience, typescript, tailwind css, barcelona',
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
      description: SITE_DESCRIPTION,
      images: ['/images/og-image.png'],
      title: PERSON_TITLE,
    },
    verification: {
      google: process.env['GOOGLE_SITE_VERIFICATION'],
    },
  };
}
