'use client';

import { FOCUS_RING } from '@/components/ui/focusRing';
import { ANALYTICS_EVENTS } from '@/lib/analytics-events';

import clsx from 'clsx';
import { ChevronUp } from 'lucide-react';

const scrollToTop = () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  // The button hides itself once back at the top: hand keyboard focus to the
  // first element of the page instead of leaving it on an invisible control.
  document.getElementById('skip-link')?.focus({ preventScroll: true });
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
      'fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-40 p-3 rounded-full bg-gradient-to-br from-secondary-600 to-primary-500 shadow-lg transition-[transform,box-shadow,opacity] duration-200 ease-out hover:shadow-xl hover:scale-110',
      FOCUS_RING,
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
