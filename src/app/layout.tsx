import type { Metadata } from 'next';
import { Josefin_Sans, League_Spartan } from 'next/font/google';
import Script from 'next/script';

import BackToTopButton from '@/components/BackToTopButton';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MouseFollowGradientBackground from '@/components/MouseFollowGradientBackground';
import NotificationProvider from '@/contexts/NotificationContext';

import '@/styles/globals.scss';

import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  about:
    'I specialize in building high-performance web applications with a focus on accessibility and inclusivity. Passionate about delivering seamless experiences to users of all abilities.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ES',
    addressLocality: 'Spain',
  },
  description: 'Developing performance-focused, inclusive web products that leave no one behind.',
  email: 'contact@kevin-sauvage.com',
  hasOccupation: {
    '@type': 'Occupation',
    description: 'Frontend Developer specializing in React, Next.js, and web accessibility',
    name: 'Frontend Developer',
    occupationLocation: {
      '@type': 'Place',
      name: 'Decathlon International',
    },
  },
  jobTitle: 'Frontend Developer',
  knowsAbout: [
    'JavaScript',
    'Web Accessibility',
    'React',
    'Next.js',
    'Frontend Development',
    'Performance Optimization',
    'TypeScript',
    'HTML',
    'CSS',
    'Sass',
    'Tailwind CSS',
    'Responsive Design',
    'Progressive Web Apps',
    'Web Performance',
    'Web Development',
    'Internationalization',
    'SEO',
    'User Experience',
  ],
  mainEntityOfPage: {
    '@id': 'https://www.kevin-sauvage.com',
    '@type': 'WebPage',
    description: 'Portfolio website of Kévin Sauvage, Frontend Developer',
    name: 'Kévin Sauvage - Portfolio',
  },
  name: 'Kévin Sauvage',
  sameAs: [
    'https://www.linkedin.com/in/kevin-sauvage',
    'https://github.com/kevinsauvage',
    'https://www.kevin-sauvage.com',
  ],
  url: 'https://www.kevin-sauvage.com',
};

const LeagueSpartan = League_Spartan({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'],
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true,
  preload: true,
});

const JosefinSans = Josefin_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-base',
  weight: ['100', '200', '300', '400', '500'],
  fallback: ['system-ui', 'arial', 'sans-serif'],
  adjustFontFallback: true,
  preload: true,
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang='en'
      className={clsx(
        'bg-zinc-950 h-auto w-auto leading-tight',
        JosefinSans.variable,
        LeagueSpartan.variable
      )}
    >
      <head>
        <link rel='preconnect' href='https://api-gateway.umami.dev' crossOrigin='anonymous' />
        <link rel='dns-prefetch' href='https://api-gateway.umami.dev' />
      </head>
      <body className='w-full h-full text-zinc-50 antialiased font-base font-light'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          strategy='lazyOnload'
          data-website-id={process.env['UMAMI_ID']}
          src={'/growth/rewrites'}
        />
        <NotificationProvider>
          <MouseFollowGradientBackground />
          <nav aria-label='Skip navigation'>
            <a
              href='#main-content'
              className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-md focus:shadow-lg'
            >
              Skip to main content
            </a>
          </nav>
          <Header />
          <main
            id='main-content'
            className='min-h-dvh flex-1 h-full w-full flex flex-col'
            role='main'
            aria-label='Main content'
          >
            {children}
          </main>
          <Footer />
          <BackToTopButton />
        </NotificationProvider>
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = 'https://www.kevin-sauvage.com';

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
      locale: 'en',
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
