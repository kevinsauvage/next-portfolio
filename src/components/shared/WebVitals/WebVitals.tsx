'use client';

import { useReportWebVitals } from 'next/web-vitals';

export const WebVitals = () => {
  useReportWebVitals(metric => {
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track('web-vitals', {
        metric: metric.name,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        rating: metric.rating,
      });
    }
  });

  return null;
};
