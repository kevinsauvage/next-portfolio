import { useEffect, useState } from 'react';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });

    globalThis.addEventListener('mousemove', onMouseMove);

    return () => {
      globalThis.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return position as { x: number; y: number };
};

export default useMousePosition;
