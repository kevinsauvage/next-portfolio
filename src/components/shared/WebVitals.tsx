'use client';

import { useReportWebVitals } from 'next/web-vitals';

import { trackEvent } from '@/lib/analytics';

const WebVitals = () => {
  useReportWebVitals(metric => {
    trackEvent('web-vitals', {
      metric: metric.name,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      rating: metric.rating,
    });
  });

  return null;
};

export default WebVitals;
