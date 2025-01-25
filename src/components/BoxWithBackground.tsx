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

const BoxWithBackground = ({ children, className, backgroundConfig }: Properties) => {
  return (
    <div
      className={clsx(
        'relative flex flex-col overflow-hidden justify-between items-center border border-zinc-800 bg-zinc-900 bg-opacity-50 md:p-0',
        className,
      )}
    >
      <Background {...backgroundConfig} />
      <div className="relative flex flex-col items-center justify-center h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default BoxWithBackground;
