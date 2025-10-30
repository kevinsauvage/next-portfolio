import type { Metadata } from 'next';

export function buildRootMetadata(baseUrl: string): Metadata {
  return {
    alternates: {
      canonical: baseUrl,
    },
    authors: [{ name: 'Kévin Sauvage' }],
    category: 'Technology',
    creator: 'Kévin Sauvage',
    description:
      'Experienced Frontend Developer specializing in React, Next.js, and accessibility-first design. Building scalable web applications for Decathlon International with 3+ years of expertise in performance optimization and user experience.',
    generator: 'Next.js',
    keywords:
      'frontend developer, react expert, next.js developer, javascript developer, web accessibility, performance optimization, e-commerce development, user experience, typescript, tailwind css',
    metadataBase: new URL(baseUrl),
    openGraph: {
      description:
        'Experienced Frontend Developer specializing in React, Next.js, and accessibility-first design. Building scalable web applications for Decathlon International with 3+ years of expertise in performance optimization and user experience.',
      images: [
        {
          alt: 'Kévin Sauvage - Frontend Developer | React & Next.js Expert',
          height: 630,
          url: '/images/og-image.png',
          width: 1200,
        },
      ],
      locale: 'en_US',
      siteName: 'Kévin Sauvage - Frontend Developer | React & Next.js Expert',
      title: 'Kévin Sauvage - Frontend Developer | React & Next.js Expert',
      type: 'website',
      url: baseUrl,
    },
    publisher: 'Kévin Sauvage',
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
      default: 'Kévin Sauvage - Frontend Developer | React & Next.js Expert',
      template: '%s | Kévin Sauvage',
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@kevinsauvage',
      description:
        'Experienced Frontend Developer specializing in React, Next.js, and accessibility-first design. Building scalable web applications for Decathlon International with 3+ years of expertise in performance optimization and user experience.',
      images: ['/images/og-image.png'],
      site: '@kevinsauvage',
      title: 'Kévin Sauvage - Frontend Developer | React & Next.js Expert',
    },
    verification: {
      google: process.env['GOOGLE_SITE_VERIFICATION'],
    },
  };
}


