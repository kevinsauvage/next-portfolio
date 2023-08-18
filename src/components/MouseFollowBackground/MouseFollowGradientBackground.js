'use client';

import { useEffect, useState } from 'react';

import styles from './MouseFollowGradientBackground.module.scss';

const MouseFollowGradientBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = ({ clientX, clientY }) => setMousePosition({ x: clientX, y: clientY });

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, var(--color-background-2), var(--color-background-1))`,
  };

  return <div className={styles.background} style={gradientStyle} />;
};

export default MouseFollowGradientBackground;
