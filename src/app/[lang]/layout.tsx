import type { Metadata } from 'next';

import Footer from '@/components/Footer';
import HeaderPresenter from '@/components/HeaderPresenter';
import MouseFollowGradientBackground from '@/components/MouseFollowGradientBackground';
import { getDictionary } from '@/dictionaries/dictionaries';

import '@/styles/globals.scss';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const t = await getDictionary(params.lang);

  return {
    alternates: { canonical: 'https://www.kevin-sauvage.com/' },
    description: t.home.metadata.description,
    title: t.home.metadata.title,
  };
}

const PageLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) => {
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
