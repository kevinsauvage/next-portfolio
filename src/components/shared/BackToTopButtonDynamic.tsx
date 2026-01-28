'use client';

import dynamic from 'next/dynamic';

const BackToTopButtonDynamic = dynamic(() => import('@/components/shared/BackToTopButton'), {
  ssr: false,
});

export default BackToTopButtonDynamic;
