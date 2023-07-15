import { useEffect, useRef, useState } from 'react';

const useOnScreen = () => {
  const reference = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const { current } = reference;
    const observer = new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting));

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [reference]);

  return { isIntersecting, reference };
};

export default useOnScreen;
