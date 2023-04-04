import { useEffect, useState } from "react";

const useOnScreen = (reference, rootMargin = "0px") => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );

    if (reference.current) observer.observe(reference.current);

    return () => observer.disconnect(reference);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isIntersecting;
};

export default useOnScreen;
