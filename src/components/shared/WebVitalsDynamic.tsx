'use client';

import dynamic from 'next/dynamic';

const WebVitalsDynamic = dynamic(() => import('@/components/shared/WebVitals'), {
  ssr: false,
});

export default WebVitalsDynamic;
