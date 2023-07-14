import { useEffect, useRef, useState } from 'react';

const useOnScreen = (className, activeClass, remove) => {
  const reference = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const { current } = reference;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [reference]);

  useEffect(() => {
    if (!className) return;
    reference?.current?.classList.add(className);
    if (isIntersecting) {
      reference.current.classList.add(activeClass);
    } else if (remove) {
      reference.current.classList.remove(activeClass);
    }
  }, [isIntersecting, className, remove, activeClass]);

  return { isIntersecting, reference };
};

export default useOnScreen;
