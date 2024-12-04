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
    alternates: { canonical: t.home.metadata.canonical },
    authors: [{ name: t.home.metadata.author }],
    description: t.home.metadata.description,
    keywords: t.home.metadata.keywords,
    openGraph: {
      description: t.home.metadata.description,
      images: [{ url: '/images/og-image.png' }],
      title: t.home.metadata.title,
      type: 'website',
      url: t.home.metadata.canonical,
    },
    title: t.home.metadata.title,
    twitter: {
      card: 'summary_large_image',
      creator: t.home.metadata.author,
      description: t.home.metadata.description,
      images: '/images/og-image.png',
      title: t.home.metadata.title,
    },
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
