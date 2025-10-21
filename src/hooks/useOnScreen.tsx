'use client';

import { useEffect, useRef, useState } from 'react';

const useOnScreen = (config = {}, reset = true) => {
  const reference = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const { current } = reference;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (reset) {
          setIsIntersecting(entry.isIntersecting);
        } else if (entry.isIntersecting) {
          setIsIntersecting(true);
        }
      },
      // Pass the configuration options to the IntersectionObserver constructor
      config
    );

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [reference, reset, config]);

  return { isIntersecting, reference };
};

export default useOnScreen;
