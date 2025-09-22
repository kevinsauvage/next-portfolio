'use client';

import { useEffect, useState } from 'react';

import useMousePosition from '@/hooks/useMousePosition';

const MouseFollowGradientBackground = () => {
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const position = useMousePosition();

  useEffect(() => {
    const { innerWidth, innerHeight } = globalThis;

    const x = (position.x / innerWidth) * 100;
    const y = (position.y / innerHeight) * 100;

    setGlowPosition({ x, y });
  }, [position]);

  return (
    <div
      className='hidden z-10 glow-overlay bg-zinc-600 lg:flex '
      style={{
        left: `${glowPosition.x}%`,
        top: `${glowPosition.y}%`,
      }}
    />
  );
};

export default MouseFollowGradientBackground;
