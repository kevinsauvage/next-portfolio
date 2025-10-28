import type { Metadata } from 'next';
import { Josefin_Sans, League_Spartan } from 'next/font/google';
import Script from 'next/script';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import BackToTopButton from '@/components/shared/BackToTopButton';
import { WebVitals } from '@/components/shared/WebVitals';
import NotificationProvider from '@/contexts/NotificationContext';

import '@/styles/globals.scss';

import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kévin Sauvage',
  jobTitle: 'Frontend Developer',
  email: 'contact@kevin-sauvage.com',
  url: 'https://www.kevin-sauvage.com',
  description: 'Developing performance-focused, inclusive web products that leave no one behind.',
  about:
    'I specialize in building high-performance web applications with a focus on accessibility and inclusivity. Passionate about delivering seamless experiences to users of all abilities.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ES',
    addressLocality: 'Spain',
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Frontend Developer',
    description: 'Frontend Developer specializing in React, Next.js, and web accessibility',
    occupationLocation: {
      '@type': 'Place',
      name: 'Decathlon International',
    },
  },
  knowsAbout: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Web Accessibility',
    'Frontend Development',
    'Performance Optimization',
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
  sameAs: [
    'https://www.linkedin.com/in/kevin-sauvage',
    'https://github.com/kevinsauvage',
    'https://www.kevin-sauvage.com',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Kévin Sauvage - Portfolio',
  url: 'https://www.kevin-sauvage.com',
  author: {
    '@type': 'Person',
    name: 'Kévin Sauvage',
  },
  description: 'Portfolio website of Kévin Sauvage, Frontend Developer',
  inLanguage: 'en',
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Kévin Sauvage - Frontend Development Services',
  url: 'https://www.kevin-sauvage.com',
  description:
    'Professional frontend development services specializing in React, Next.js, and web accessibility',
  areaServed: 'Worldwide',
  serviceType: 'Frontend Development',
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
  weight: ['100', '200', '300', '400', '500', '600', '700'],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
        <Script
          strategy='lazyOnload'
          data-website-id={process.env['UMAMI_ID']}
          src={'/growth/rewrites'}
        />
        <NotificationProvider>
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
        <WebVitals />
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
