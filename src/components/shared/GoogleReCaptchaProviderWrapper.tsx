'use client';

import { useEffect, useRef, useState } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

type Properties = {
  children: React.ReactNode;
  reCaptchaKey: string;
  nonce?: string | undefined;
};

/**
 * Loads the reCAPTCHA script only once the wrapped form is about to scroll into
 * view. Wrap just the form: swapping in the provider remounts what it wraps.
 */
const GoogleReCaptchaProviderWrapper = ({ children, reCaptchaKey, nonce }: Properties) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px', threshold: 0 }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef}>
      {shouldLoad ? (
        <GoogleReCaptchaProvider
          reCaptchaKey={reCaptchaKey}
          scriptProps={{ appendTo: 'head', async: true, defer: true, ...(nonce && { nonce }) }}
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
