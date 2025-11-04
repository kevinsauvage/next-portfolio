type MeshGradientProps = {
  overlayOpacity?: number;
};

const MeshGradient = ({ overlayOpacity = 70 }: MeshGradientProps) => {
  return (
    <>
      <div className='absolute inset-0 bg-mesh-gradient bg-[length:140%_140%] bg-[position:0%_50%] bg-no-repeat animate-mesh-slow border-0 justify-start overflow-hidden' />
      <div
        className='absolute inset-0 overflow-hidden backdrop-blur-sm pointer-events-none'
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
      />
    </>
  );
};

export default MeshGradient;
