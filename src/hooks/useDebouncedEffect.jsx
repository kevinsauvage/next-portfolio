import { useCallback, useEffect } from 'react';

const useDebouncedEffect = (effect, delay, deps) => {
  const callback = useCallback(effect, [...deps, effect]);

  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);
    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

export default useDebouncedEffect;
