import Script from 'next/script';

import { getPublicEnv } from '@/lib/env';

const ReCaptchaScript = () => {
  const publicEnv = getPublicEnv();
  const recaptchaSiteKey = publicEnv.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!recaptchaSiteKey) {
    return null;
  }

  return (
    <Script
      src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
      strategy='lazyOnload'
    />
  );
};

export default ReCaptchaScript;
