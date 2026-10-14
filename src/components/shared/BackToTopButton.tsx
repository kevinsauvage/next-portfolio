'use client';

import { ANALYTICS_EVENTS } from '@/lib/analytics-events';

import clsx from 'clsx';
import { ChevronUp } from 'lucide-react';

const scrollToTop = () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
};

/**
 * Visibility is driven by the `page-scrolled-far` class that `ScrollDetector`
 * toggles on <html>, so scrolling never re-renders this component. `invisible`
 * keeps the hidden button out of the tab order and accessibility tree.
 */
const BackToTopButton: React.FC = () => (
  <button
    type='button'
    onClick={scrollToTop}
    className={clsx(
      'fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gradient-to-br from-secondary-600 to-primary-500 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-zinc-950',
      'text-zinc-50',
      'invisible opacity-0 translate-y-4 [.page-scrolled-far_&]:visible [.page-scrolled-far_&]:opacity-100 [.page-scrolled-far_&]:translate-y-0'
    )}
    aria-label='Back to top'
    title='Back to top'
    data-analytics-event={ANALYTICS_EVENTS.UI_BACK_TO_TOP_CLICK}
  >
    <ChevronUp size={24} strokeWidth={2} aria-hidden='true' />
  </button>
);

export default BackToTopButton;
