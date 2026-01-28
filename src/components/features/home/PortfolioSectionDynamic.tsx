'use client';

import dynamic from 'next/dynamic';

const PortfolioSectionDynamic = dynamic(
  () => import('@/components/features/home/PortfolioSection'),
  {
    ssr: false,
  }
);

export default PortfolioSectionDynamic;
