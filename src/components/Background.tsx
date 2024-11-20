import { useId } from 'react';

import clsx from 'clsx';

const Background = ({ strokeColor = '#FFF', strokeWidth = 1, scale = 0.2, className = '' }) => {
  const id = useId();

  return (
    <div
      className={clsx('absolute -z-10 inset-0 w-full h-full overflow-hidden rounded-lg', className)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        aria-label="Background pattern"
        role="img"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={id}
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform={`scale(${scale})`}
          >
            <path
              data-color="outline"
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              d="M50 0v100M100 50H0"
            />
          </pattern>
        </defs>
        <rect fill={`url(#${id})`} width="100%" height="100%" />
      </svg>
    </div>
  );
};

export default Background;
