'use client';

import dynamic from 'next/dynamic';

const CareerSectionDynamic = dynamic(() => import('@/components/features/home/CareerSection'), {
  ssr: false,
});

export default CareerSectionDynamic;
