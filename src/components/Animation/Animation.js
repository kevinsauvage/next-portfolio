import { cloneElement } from 'react';

import useOnScreen from '@/hooks/useOnScreen';

const Animation = ({
  replay,
  duration = 300,
  delay = 0,
  iterationCount = 1,
  timingFunction,
  fillMode,
  animationKeyframes,
  children,
  initialStyle = {},
}) => {
  const { isIntersecting, reference } = useOnScreen();

  const getAnimationName = () => {
    if (replay) return isIntersecting ? animationKeyframes.join(', ') : '';
    return animationKeyframes.join(', ');
  };

  const animationStyle = {
    animationDelay: `${delay}ms`,
    animationDuration: `${duration}ms`,
    animationFillMode: fillMode,
    animationIterationCount: iterationCount,
    animationName: getAnimationName(),
    animationPlayState: isIntersecting ? 'running' : 'paused',
    animationTimingFunction: timingFunction,
  };

  const mergedStyles = { ...animationStyle, ...initialStyle };

  return <div ref={reference}>{cloneElement(children, { style: mergedStyles })}</div>;
};

export default Animation;
