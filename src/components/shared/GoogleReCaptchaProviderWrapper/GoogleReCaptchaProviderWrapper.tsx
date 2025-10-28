'use client';

import { useEffect, useRef, useState } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const GoogleReCaptchaProviderWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const recaptchaKey: string | undefined = process?.env?.['NEXT_PUBLIC_RECAPTCHA_SITE_KEY'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '300px',
        threshold: 0,
      }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      {shouldLoad ? (
        <GoogleReCaptchaProvider
          reCaptchaKey={recaptchaKey ?? 'NOT DEFINED'}
          scriptProps={{
            appendTo: 'head',
            async: true,
            defer: true,
            nonce: '',
          }}
        >
          {children}
        </GoogleReCaptchaProvider>
      ) : (
        children
      )}
    </div>
  );
};

export default GoogleReCaptchaProviderWrapper;
