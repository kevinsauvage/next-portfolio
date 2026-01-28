'use client';

import { Toaster } from 'sonner';

const SonnerToaster = () => {
  return (
    <Toaster
      theme='dark'
      richColors
      closeButton
      position='bottom-right'
      toastOptions={{
        className: 'bg-zinc-950 text-zinc-50 border border-zinc-800',
      }}
    />
  );
};

export default SonnerToaster;
