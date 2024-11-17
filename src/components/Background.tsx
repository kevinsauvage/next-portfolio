import clsx from 'clsx';

const Background = ({ strokeColor = '#FFF', strokeWidth = 0.2, scale = 0.2, className = '' }) => {
  return (
    <div
      className={clsx('absolute -z-10 inset-0 w-full h-full overflow-hidden rounded-lg', className)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <defs>
          <pattern
            id="p"
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
        <rect fill="url(#p)" width="100%" height="100%" />
      </svg>
    </div>
  );
};

export default Background;
