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
        'relative flex flex-col justify-between items-center border border-zinc-800 rounded-lg bg-zinc-900 bg-opacity-50 md:p-0 ' +
        className
      }
    >
      <Background strokeWidth={0.9} scale={0.1} className="opacity-70" />
      <div className="relative flex flex-col items-center justify-center h-full w-full p-6">
        {children}
      </div>
    </div>
  );
};

export default BoxWithBackground;
