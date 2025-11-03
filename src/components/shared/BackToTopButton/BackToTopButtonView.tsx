'use client';

import { colors } from '@/design-system/tokens';

import clsx from 'clsx';
import { ChevronUp } from 'lucide-react';

type BackToTopButtonViewProps = {
  isVisible: boolean;
  onClick: () => void;
};

const BackToTopButtonView = ({ isVisible, onClick }: BackToTopButtonViewProps) => {
  return (
    <nav aria-label='Scroll to top' className={clsx(!isVisible && 'pointer-events-none')}>
      <button
        type='button'
        onClick={onClick}
        className={clsx(
          'fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gradient-to-br from-secondary-600 to-primary-500 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-zinc-950',
          colors.text.primary,
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}
        aria-label='Back to top'
        title='Back to top'
        data-umami-event='back_to_top_click'
        disabled={!isVisible}
      >
        <ChevronUp size={24} strokeWidth={2} aria-hidden='true' />
      </button>
    </nav>
  );
};

export default BackToTopButtonView;
