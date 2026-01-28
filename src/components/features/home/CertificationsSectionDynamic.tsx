'use client';

import dynamic from 'next/dynamic';

const CertificationsSectionDynamic = dynamic(
  () => import('@/components/features/home/CertificationsSection')
);

export default CertificationsSectionDynamic;
