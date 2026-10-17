'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

import {
  applyConsentToGtag,
  normalizeGtmId,
  normalizeMeasurementId,
  pushGoogleTagBootstrap,
} from '@/lib/analytics';
import { CONSENT_UPDATED_EVENT, hasTagManagerConsent } from '@/lib/consent';

type Properties = {
  ga4MeasurementId?: string | undefined;
  gtmId?: string | undefined;
};

/**
 * Loads the analytics scripts only once the visitor has granted analytics or
 * advertising consent, and re-asserts the stored choice on `gtag` first so
 * they start with the right signals rather than the denied defaults.
 *
 * The Google tag is loaded here rather than by the container's `Google Tag`
 * tag: that path pulls gtag.js with `cx=c` and never issues the GA4
 * configuration, so GA4 received nothing at all (no `/g/collect`, no `_ga`,
 * Realtime stuck at zero). This is the documented install and it honours
 * Consent Mode (`gcs=G111` on the hit once analytics storage is granted).
 *
 * The container still loads, and owns the GA4 event tags that forward the
 * `dataLayer` events this site pushes — gtag.js alone does not forward those.
 *
 * `lazyOnload` on purpose: together they are ~900 KB and a long main-thread
 * task. Requests are only made after consent is granted.
 */
const GoogleTagManager = ({ ga4MeasurementId, gtmId }: Properties) => {
  const measurementId = normalizeMeasurementId(ga4MeasurementId);
  const containerId = normalizeGtmId(gtmId);
  const [hasConsent, setHasConsent] = useState(false);
  const bootstrapped = useRef(false);

  useEffect(() => {
    const sync = () => {
      applyConsentToGtag();
      setHasConsent(hasTagManagerConsent());
    };

    sync();
    window.addEventListener(CONSENT_UPDATED_EVENT, sync);

    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, sync);
  }, []);

  useEffect(() => {
    // Once per page load: re-granting consent must not queue a second config/page_view.
    if (!hasConsent || !measurementId || bootstrapped.current) return;
    bootstrapped.current = true;
    pushGoogleTagBootstrap(measurementId);
  }, [hasConsent, measurementId]);

  if (!hasConsent) return null;

  return (
    <>
      {measurementId ? (
        <Script
          id='google-tag'
          strategy='lazyOnload'
          src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        />
      ) : null}
      {containerId ? (
        <Script
          id='google-tag-manager'
          strategy='lazyOnload'
          src={`https://www.googletagmanager.com/gtm.js?id=${containerId}`}
        />
      ) : null}
    </>
  );
};

export default GoogleTagManager;
