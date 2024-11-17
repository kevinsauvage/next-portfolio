import Background from './Background';

const BoxWithBackground = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={
        'relative flex flex-col justify-between items-center p-6 border border-zinc-800 rounded-lg bg-zinc-900 bg-opacity-50 ' +
        className
      }
    >
      <Background strokeWidth={0.9} scale={0.1} className="opacity-70" />
      <div className="relative flex flex-col items-center justify-center h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default BoxWithBackground;
