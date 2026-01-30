'use client';

import dynamic from 'next/dynamic';

const BackToTopButton = dynamic(() => import('@/components/shared/BackToTopButton'), {
  ssr: false,
});

const ClientOnlyWidgets = () => {
  return <BackToTopButton />;
};

export default ClientOnlyWidgets;
