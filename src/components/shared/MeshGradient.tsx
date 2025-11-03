const MeshGradient = () => {
  return (
    <>
      <div className='absolute inset-0 bg-mesh-gradient bg-[length:140%_140%] bg-[position:0%_50%] bg-no-repeat animate-mesh-slow border-0 justify-start overflow-hidden' />
      <div className='absolute inset-0 overflow-hidden bg-black/70 backdrop-blur-sm pointer-events-none' />
    </>
  );
};

export default MeshGradient;
