import Footer from '@/components/Footer';
import HeaderPresenter from '@/components/HeaderPresenter';
import MouseFollowGradientBackground from '@/components/MouseFollowGradientBackground';

import '@/styles/globals.scss';

type Properties = { children: React.ReactNode; params: { lang: string } };

const PageLayout = ({ children, params }: Properties) => {
  return (
    <>
      <MouseFollowGradientBackground />
      <HeaderPresenter lang={params.lang} />
      <main className="min-h-dvh flex-1 h-full w-full flex flex-col">{children}</main>
      <Footer />
    </>
  );
};

export default PageLayout;
