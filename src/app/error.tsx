'use client';

import { useEffect } from 'react';

import Button from '@/components/ui/Button/Button';
import { BodySmall, H1 } from '@/components/ui/Typography';
import { PERSON_NAME } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { ANALYTICS_EVENTS } from '@/lib/analytics-events';

import * as Sentry from '@sentry/nextjs';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const handleReload = () => {
  globalThis.window.location.reload();
};

const ErrorPage = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    Sentry.captureException(error);
    trackEvent(ANALYTICS_EVENTS.APP_ERROR_BOUNDARY, {
      digest: error.digest ?? '',
    });
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-black text-zinc-50'>
      <title>{`Something went wrong | ${PERSON_NAME}`}</title>
      <div className='max-w-md mx-auto text-center p-6'>
        <div className='mb-6'>
          <H1 className='mb-2 text-2xl md:text-3xl'>Oops! Something went wrong</H1>
          <BodySmall className='mb-4'>
            We encountered an unexpected error. Please try refreshing the page.
          </BodySmall>
        </div>
        <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <Button
            label='Reload Page'
            onClick={handleReload}
            variant='primary'
            size='lg'
            eventName={ANALYTICS_EVENTS.ERROR_BOUNDARY_RELOAD}
          />
          <Button
            label='Try Again'
            onClick={reset}
            variant='secondary'
            size='lg'
            eventName={ANALYTICS_EVENTS.ERROR_BOUNDARY_RETRY}
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
