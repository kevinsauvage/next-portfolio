import Footer from '@/components/Footer';
import HeaderPresenter from '@/components/HeaderPresenter';
import LayoutWrapper from '@/components/LayoutWrapper';
import TextureBg from '@/components/TextureBg';
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
    <TextureBg />
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
