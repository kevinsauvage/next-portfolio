/* eslint-disable camelcase */
import { Analytics } from '@vercel/analytics/react';
import { Roboto_Condensed, Roboto_Mono } from 'next/font/google';

import Aside from '@/components/Aside/Aside';
import Container from '@/components/Container/Container';
import MouseFollowGradientBackground from '@/components/MouseFollowBackground/MouseFollowGradientBackground';
import SplashScreen from '@/components/SplashScreen/SplashScreen';
import NotificationProvider from '@/contexts/NotificationContext';

import '@/styles/globals.scss';
import styles from './layout.module.scss';

const robotoCondensed = Roboto_Condensed({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-heading',
  weight: '700',
});

const robotoMono = Roboto_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-body',
});

const PageLayout = ({ children }) => (
  <html lang="en">
    <body className={`${robotoCondensed.variable} ${robotoMono.variable}`}>
      <SplashScreen />
      <NotificationProvider>
        <Container classname={styles.container}>
          <Aside />
          <div>{children}</div>
        </Container>
      </NotificationProvider>
      <MouseFollowGradientBackground />
      <Analytics />
    </body>
  </html>
);

export default PageLayout;

export const metadata = {
  alternates: {
    canonical: 'https://www.kevin-sauvage.com/',
  },
  description:
    'Crafting high-performance, inclusive web solutions that prioritize accessibility. Proficient in JavaScript, React.js, Next.js, and CSS/Sass to deliver exceptional front-end experiences.',
  title: 'Kévin Sauvage',
};
