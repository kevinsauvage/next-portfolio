'use client';

import { useEffect, useRef, useState } from 'react';

const useOnScreen = (reset = true) => {
  const reference = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const { current } = reference;
    const observer = new IntersectionObserver(([entry]) => {
      if (reset) {
        setIsIntersecting(entry.isIntersecting);
      } else if (entry.isIntersecting) {
        setIsIntersecting(true);
      }
    });

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [reference, reset]);

  return { isIntersecting, reference };
};

export default useOnScreen;
