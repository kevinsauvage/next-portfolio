import clsx from 'clsx';

const Background = ({ strokeColor = '#FFF', strokeWidth = 0.2, className = '' }) => {
  return (
    <>
      <div
        className={
          clsx(
            'absolute -z-10 inset-0 w-full h-full overflow-hidden rounded-full',
            className,
          ) as string
        }
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern
              id="p"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
              patternTransform="scale(0.64)"
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
      <div className="absolute -z-10 inset-0 rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-zinc-900 to-zinc-900 via-50% bg-[length:80%_100%] bg-center" />
    </>
  );
};

export default Background;
