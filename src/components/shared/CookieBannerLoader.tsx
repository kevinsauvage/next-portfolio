'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { OPEN_CONSENT_SETTINGS_EVENT, readStoredConsent } from '@/lib/consent';

const CookieBanner = dynamic(() => import('@/components/shared/CookieBanner'), { ssr: false });

/** What to mount: `key` remounts the banner on every reopen request. */
type BannerRequest = { key: number; openSettings: boolean };

/**
 * Mounts the banner chunk only when there is no stored choice, or when
 * `openConsentSettings()` asks for it (the footer button). The cookie is read
 * in an effect, not during render, so the first paint is identical with and
 * without a stored choice — no hydration mismatch.
 */
const CookieBannerLoader = () => {
  const [request, setRequest] = useState<BannerRequest | null>(null);

  useEffect(() => {
    if (readStoredConsent() === null) {
      setRequest({ key: 0, openSettings: false });
    }

    const reopen = () =>
      setRequest(previous => ({ key: (previous?.key ?? 0) + 1, openSettings: true }));

    window.addEventListener(OPEN_CONSENT_SETTINGS_EVENT, reopen);

    return () => window.removeEventListener(OPEN_CONSENT_SETTINGS_EVENT, reopen);
  }, []);

  if (!request) return null;

  return <CookieBanner key={request.key} openSettings={request.openSettings} />;
};

export default CookieBannerLoader;
