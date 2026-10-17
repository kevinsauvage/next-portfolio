'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { TOAST_REQUESTED_EVENT } from '@/lib/notify';

const SonnerToaster = dynamic(() => import('@/components/shared/SonnerToaster'), { ssr: false });

/**
 * Mounts the toast UI the first time a toast is requested, so sonner never lands
 * in a page's initial bundle — a visitor who never triggers a toast never pays
 * for it. `sonner` replays toasts created before its toaster subscribed, so
 * nothing is lost if the mount resolves a tick after the call.
 */
const SonnerToasterLoader = () => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (shouldShow) return;

    const show = () => setShouldShow(true);
    window.addEventListener(TOAST_REQUESTED_EVENT, show, { once: true });

    return () => window.removeEventListener(TOAST_REQUESTED_EVENT, show);
  }, [shouldShow]);

  if (!shouldShow) return null;

  return <SonnerToaster />;
};

export default SonnerToasterLoader;
