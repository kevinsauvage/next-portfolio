import Background from './Background';

import clsx from 'clsx';

type BackgroundConfig = {
  strokeWidth?: number;
  scale?: number;
  className?: string;
};

type Properties = {
  children: React.ReactNode;
  className?: string;
  backgroundConfig?: BackgroundConfig;
};

const BoxWithBackground = ({
  children,
  className,
  backgroundConfig = { className: 'opacity-70', scale: 0.1, strokeWidth: 0.9 },
}: Properties) => {
  return (
    <div
      className={clsx(
        'relative flex flex-col justify-between items-center border border-zinc-800 rounded-lg bg-zinc-900 bg-opacity-50 md:p-0',
        className,
      )}
    >
      <Background
        strokeWidth={backgroundConfig.strokeWidth}
        scale={backgroundConfig.scale}
        className={backgroundConfig.className}
      />
      <div className="relative flex flex-col items-center justify-center h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default BoxWithBackground;
