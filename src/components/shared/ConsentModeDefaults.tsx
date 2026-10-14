import { consentSignals, DENIED_CONSENT } from '@/lib/consent';
import { getNonce } from '@/lib/csp-nonce';

/**
 * Consent Mode v2 starting state: every optional category denied until the
 * banner says otherwise. `wait_for_update` gives a stored grant a moment to
 * land, so a returning visitor's first pageview is not reported as denied.
 */
const DEFAULT_CONSENT = { ...consentSignals(DENIED_CONSENT), wait_for_update: 500 };

/**
 * Establishes the dataLayer and the default consent state, in `<head>` and
 * before anything else can fire a tag. Inline on purpose: an external file
 * would be a second round-trip ahead of every tag, and the CSP nonce makes
 * inline safe here (see `src/proxy.ts`).
 */
const ConsentModeDefaults = async () => {
  const nonce = await getNonce();
  const snippet = [
    'window.dataLayer=window.dataLayer||[];',
    'function gtag(){window.dataLayer.push(arguments);}',
    `gtag('consent','default',${JSON.stringify(DEFAULT_CONSENT)});`,
  ].join('');

  return (
    <script nonce={nonce} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: snippet }} />
  );
};

export default ConsentModeDefaults;
