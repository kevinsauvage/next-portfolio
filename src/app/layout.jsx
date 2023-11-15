import Container from '@/components/Container/Container';
import FullBackgroundImage from '@/components/FullBackgroundImage/FullBackgroundImage';
import HeaderPresenter from '@/components/Header/HeaderPresenter';
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper';
import MouseFollowGradientBackground from '@/components/MouseFollowBackground/MouseFollowGradientBackground';
import NotificationProvider from '@/contexts/NotificationContext';

import '@/styles/globals.scss';

const PageLayout = ({ children }) => (
  <LayoutWrapper>
    <NotificationProvider>
      <HeaderPresenter />
      <Container>{children}</Container>
      <FullBackgroundImage />
      <MouseFollowGradientBackground />
    </NotificationProvider>
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
