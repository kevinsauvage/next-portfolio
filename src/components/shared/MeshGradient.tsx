import clsx from 'clsx';

type MeshGradientProps = {
  overlayOpacity?: number;
  /** Hidden-until-hover surfaces (cards) skip the blur and only animate while shown. */
  lightweight?: boolean;
};

const MeshGradient = ({ overlayOpacity = 70, lightweight = false }: MeshGradientProps) => {
  return (
    <>
      <div
        className={clsx(
          'absolute inset-0 bg-mesh-gradient bg-[length:140%_140%] bg-[position:0%_50%] bg-no-repeat border-0 justify-start overflow-hidden',
          lightweight
            ? 'group-hover:animate-mesh-slow group-focus-within:animate-mesh-slow'
            : 'animate-mesh-slow'
        )}
      />
      <div
        className={clsx(
          'absolute inset-0 overflow-hidden pointer-events-none',
          !lightweight && 'backdrop-blur-sm'
        )}
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
      />
    </>
  );
};

export default MeshGradient;
