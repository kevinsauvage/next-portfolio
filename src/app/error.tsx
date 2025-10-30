'use client';

import { useEffect } from 'react';

import Button from '@/components/ui/Button';
import { Body, H4 } from '@/components/ui/Typography';
import { trackEvent } from '@/lib/analytics';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const handleReload = () => {
  window.location.reload();
};

const Error = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    trackEvent('app-error', { message: error.message, digest: error.digest });
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50'>
      <div className='max-w-md mx-auto text-center p-6'>
        <div className='mb-6'>
          <H4 className='mb-2'>Oops! Something went wrong</H4>
          <Body className='mb-4'>
            We encountered an unexpected error. Please try refreshing the page.
          </Body>
          {process.env.NODE_ENV === 'development' && error && (
            <details className='text-left bg-zinc-900 p-4 rounded-md mb-4'>
              <summary className='cursor-pointer text-zinc-300 mb-2'>
                Error Details (Development)
              </summary>
              <pre className='text-sm text-red-400 overflow-auto'>
                {error.message}
                {error.stack && `\n\n${error.stack}`}
                {error.digest && `\n\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}
        </div>
        <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <Button label='Reload Page' onClick={handleReload} variant='primary' size='lg' />
          <Button label='Try Again' onClick={reset} variant='secondary' size='lg' />
        </div>
      </div>
    </div>
  );
};

export default Error;
