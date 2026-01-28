'use client';

import dynamic from 'next/dynamic';

const BackToTopButton = dynamic(() => import('@/components/shared/BackToTopButton'), {
  ssr: false,
});

const WebVitals = dynamic(() => import('@/components/shared/WebVitals'), {
  ssr: false,
});

const ClientOnlyWidgets = () => {
  return (
    <>
      <BackToTopButton />
      <WebVitals />
    </>
  );
};

export default ClientOnlyWidgets;
