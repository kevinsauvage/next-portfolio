import { Metadata } from 'next';

import { getDictionary } from '@/dictionaries/dictionaries';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default Layout;

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const t = await getDictionary(params.lang);

  return {
    alternates: { canonical: './' },
    authors: [{ name: t.home.metadata.author }],
    description: t.home.metadata.description,
    keywords: t.home.metadata.keywords,
    metadataBase: new URL(`https://www.kevin-sauvage.com/`),
    openGraph: {
      description: t.home.metadata.description,
      images: [{ url: '/images/og-image.png' }],
      siteName: t.home.metadata.title,
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
