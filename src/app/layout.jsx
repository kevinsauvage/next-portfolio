import { Analytics } from '@vercel/analytics/react';

import Container from '@/components/Container/Container';
import HeaderPresenter from '@/components/Header/HeaderPresenter';
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper';
import MouseFollowGradientBackground from '@/components/MouseFollowBackground/MouseFollowGradientBackground';
import NotificationProvider from '@/contexts/NotificationContext';

import '@/styles/globals.scss';
import styles from './layout.module.scss';

const PageLayout = ({ children }) => (
  <LayoutWrapper>
    <NotificationProvider>
      <HeaderPresenter />
      <Container>{children}</Container>
      <MouseFollowGradientBackground />
      <div className={styles.backgroundImage} />
    </NotificationProvider>
    <Analytics />
  </LayoutWrapper>
);

export default PageLayout;

export const metadata = {
  alternates: {
    canonical: 'https://www.kevin-sauvage.com/',
  },
  description:
    'Crafting high-performance, inclusive web solutions that prioritize accessibility. Proficient in JavaScript, React.js, Next.js.',
  title: 'Kévin Sauvage developer portfolio website',
};
