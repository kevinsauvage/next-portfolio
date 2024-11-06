'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const GoogleReCaptchaProviderWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const recaptchaKey: string | undefined = process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaKey ?? 'NOT DEFINED'}
      scriptProps={{
        appendTo: 'head',
        async: false,
        defer: false,
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default GoogleReCaptchaProviderWrapper;
