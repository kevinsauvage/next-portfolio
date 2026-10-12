'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

import { applyConsentToGtag, normalizeGtmId } from '@/lib/analytics';
import { CONSENT_UPDATED_EVENT, hasTagManagerConsent } from '@/lib/consent';

type Properties = {
  gtmId?: string | undefined;
  nonce?: string | undefined;
};

/**
 * Loads the GTM container only once the visitor has granted analytics or
 * advertising consent, and re-asserts the choice on `gtag` first so the
 * container starts with the right signals rather than the denied defaults.
 *
 * `lazyOnload` on purpose: GTM plus the GA4 tag it pulls is ~300 KB and a long
 * main-thread task. Events pushed before it arrives wait in `dataLayer`, and
 * refusing consent means the request is never made at all.
 */
const GoogleTagManager = ({ gtmId, nonce }: Properties) => {
  const containerId = normalizeGtmId(gtmId);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const sync = () => {
      applyConsentToGtag();
      setHasConsent(hasTagManagerConsent());
    };

    sync();
    window.addEventListener(CONSENT_UPDATED_EVENT, sync);

    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, sync);
  }, []);

  if (!containerId || !hasConsent) return null;

  return (
    <Script
      id='google-tag-manager'
      strategy='lazyOnload'
      src={`https://www.googletagmanager.com/gtm.js?id=${containerId}`}
      nonce={nonce}
    />
  );
};

export default GoogleTagManager;
