import Footer from '@/components/_scopes/layout/Footer';
import HeaderPresenter from '@/components/_scopes/layout/HeaderPresenter';
import LayoutWrapper from '@/components/_scopes/layout/LayoutWrapper';
import GlobalProvider from '@/contexts/GlobalContext';
import NotificationProvider from '@/contexts/NotificationContext';

import '@/styles/globals.scss';

type Properties = { children: React.ReactNode };

const PageLayout = ({ children }: Properties) => (
  <LayoutWrapper>
    <NotificationProvider>
      <GlobalProvider>
        <HeaderPresenter />
        <main>{children}</main>
        <Footer />
      </GlobalProvider>
    </NotificationProvider>
  </LayoutWrapper>
);

export default PageLayout;

export const metadata = {
  alternates: { canonical: 'https://www.kevin-sauvage.com/' },
  description:
    'Crafting high-performance, inclusive web solutions that prioritize accessibility. Proficient in JavaScript, React.js, Next.js.',
  title: 'Kévin Sauvage developer portfolio website',
};
