'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

type Properties = {
  children: React.ReactNode;
  reCaptchaKey: string;
};

/**
 * The `react-google-recaptcha-v3` provider, isolated in its own module purely so
 * it can be code-split. `GoogleReCaptchaProviderWrapper` is its only importer and
 * pulls it in with `next/dynamic` once the wrapped form nears the viewport, which
 * keeps the library (~33 KB gzip) out of the page's initial JS bundle.
 */
const GoogleReCaptchaProviderLoader = ({ children, reCaptchaKey }: Properties) => (
  <GoogleReCaptchaProvider
    reCaptchaKey={reCaptchaKey}
    scriptProps={{ appendTo: 'head', async: true, defer: true }}
  >
    {children}
  </GoogleReCaptchaProvider>
);

export default GoogleReCaptchaProviderLoader;
