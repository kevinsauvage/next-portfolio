import Footer from '@/components/Footer/Footer';
import HeaderPresenter from '@/components/Header/HeaderPresenter';
import LayoutWrapper from '@/components/LayoutWrapper/LayoutWrapper';
import NotificationProvider from '@/contexts/NotificationContext';

import '@/styles/globals.scss';

type Properties = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: Properties) => (
  <LayoutWrapper>
    <NotificationProvider>
      <HeaderPresenter />
      <main>{children}</main>
      <Footer />
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
