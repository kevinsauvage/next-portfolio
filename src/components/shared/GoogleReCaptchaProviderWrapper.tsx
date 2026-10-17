'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const GoogleReCaptchaProviderLoader = dynamic(
  () => import('@/components/shared/GoogleReCaptchaProviderLoader'),
  { ssr: false }
);

type Properties = {
  children: React.ReactNode;
  reCaptchaKey: string;
};

/**
 * Loads the reCAPTCHA script only once the wrapped form is about to scroll into
 * view. The provider itself is `next/dynamic`-imported, so the library stays out
 * of the initial JS bundle until then — importing it here directly would ship it
 * on every page load while its gate only deferred the *script*. Wrap just the
 * form: swapping in the provider remounts what it wraps.
 */
const GoogleReCaptchaProviderWrapper = ({ children, reCaptchaKey }: Properties) => {
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
        <GoogleReCaptchaProviderLoader reCaptchaKey={reCaptchaKey}>
          {children}
        </GoogleReCaptchaProviderLoader>
      ) : (
        children
      )}
    </div>
  );
};

export default GoogleReCaptchaProviderWrapper;
