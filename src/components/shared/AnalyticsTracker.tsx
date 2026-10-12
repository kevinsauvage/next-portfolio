'use client';

import { useEffect } from 'react';

import { trackEvent } from '@/lib/analytics';

const EVENT_ATTRIBUTE = 'data-analytics-event';
const PROPERTY_PREFIX = 'data-analytics-';

/**
 * Turns `data-analytics-event="X" data-analytics-location="header"` into
 * `trackEvent('X', { location: 'header' })` for a click anywhere inside the
 * tagged element. One delegated listener keeps server components declarative —
 * no per-link `onClick` and no extra client boundary.
 */
const eventDataFrom = (element: Element): Record<string, string> => {
  const data: Record<string, string> = {};

  for (const { name, value } of element.attributes) {
    if (!name.startsWith(PROPERTY_PREFIX) || name === EVENT_ATTRIBUTE) continue;
    data[name.slice(PROPERTY_PREFIX.length).replaceAll('-', '_')] = value;
  }

  return data;
};

const AnalyticsTracker = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const element = target.closest(`[${EVENT_ATTRIBUTE}]`);
      const eventName = element?.getAttribute(EVENT_ATTRIBUTE);
      if (!element || !eventName) return;

      trackEvent(eventName, eventDataFrom(element));
    };

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
};

export default AnalyticsTracker;
