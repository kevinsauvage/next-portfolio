import { DependencyList, EffectCallback, useCallback, useEffect } from 'react';

const useDebouncedEffect = (effect: EffectCallback, delay: number, deps: DependencyList) => {
  const callback = useCallback(effect, [...deps, effect]);

  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);
    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

export default useDebouncedEffect;
