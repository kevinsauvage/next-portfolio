import { Alegreya, Alegreya_Sans, Tilt_Warp } from 'next/font/google';

import { Analytics } from '@vercel/analytics/react';

type Properties = { children: React.ReactNode };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  description: 'Developing performance-focused, inclusive web products that leave no one behind.',
  jobTitle: 'JavaScript Developer',
  mainEntityOfPage: { '@id': 'https://www.kevin-sauvage.com', '@type': 'WebPage' },
  name: 'Kévin Sauvage',
  sameAs: ['https://www.linkedin.com/in/kevin-sauvage', 'https://github.com/kevinsauvage'],
  url: 'https://www.kevin-sauvage.com',
};

const AlegreyaFont = Alegreya({ display: 'swap', subsets: ['latin'], variable: '--font-serif' });

const AlegreyaSansFont = Alegreya_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '300', '400', '500', '700'],
});

const TiltWarpFont = Tilt_Warp({ display: 'swap', subsets: ['latin'], variable: '--font-title' });

const LayoutWrapper = ({ children }: Properties) => (
  <html
    lang="en"
    className={`${AlegreyaFont.variable} ${AlegreyaSansFont.variable} ${TiltWarpFont.variable} bg-zinc-950 leading-tight scroll-smooth`}
  >
    <body className="relative text-slate-50 antialiased font-sans overflow-x-hidden">
      <Analytics />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </body>
  </html>
);

export default LayoutWrapper;
