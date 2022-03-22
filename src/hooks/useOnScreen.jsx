import { useEffect, useState } from "react";

const useOnScreen = (ref, rootMargin = "0px") => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect(ref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isIntersecting;
};

export default useOnScreen;
