'use client';

import { useEffect, useRef } from 'react';
import { cloneElement } from 'react';

import languages from '@/config/languages.config';

const SPEED_LEVEL = 0.2;

const adjustVelocity = (velocity: number): number => {
  // Add small random changes to the velocity
  const deviation = (Math.random() - 0.5) * 0.5; // Random value between -0.25 and 0.25
  const newVelocity = velocity + deviation;

  // Ensure velocity doesn't get too slow or fast
  return Math.max(-2, Math.min(2, newVelocity));
};

const animate = (
  container: HTMLDivElement,
  state: { left: number; top: number; velocityX: number; velocityY: number; opacity: number }[],
  boxes: (HTMLDivElement | null)[],
) => {
  state.forEach((box, index) => {
    // Update positions
    box.top += box.velocityY;
    box.left += box.velocityX;
    if (box.opacity < 1) {
      box.opacity += 0.01;
    }

    // Check for collision with container edges
    if (box.top <= 0 || box.top >= container.offsetHeight - (boxes[index]?.offsetWidth || 0)) {
      box.velocityY *= -1; // Reverse vertical direction
    }
    if (box.left <= 0 || box.left >= container.offsetWidth - (boxes[index]?.offsetWidth || 0)) {
      box.velocityX *= -1; // Reverse horizontal direction
    }

    // Occasionally adjust velocity to avoid straight-line movement
    if (Math.random() < 0.01) {
      box.velocityX = adjustVelocity(box.velocityX);
      box.velocityY = adjustVelocity(box.velocityY);
    }

    // Update box position
    if (boxes[index]) {
      boxes[index]!.style.top = `${box.top}px`;
      boxes[index]!.style.left = `${box.left}px`;
      boxes[index]!.style.opacity = `${box.opacity}`;
    }
  });

  requestAnimationFrame(() => animate(container, state, boxes));
};

const LanguagesGrid: React.FC = () => {
  const containerReference = useRef<HTMLDivElement | null>(null); // Correctly typed ref
  const boxesReference: React.MutableRefObject<(HTMLDivElement | null)[]> = useRef([]);

  const startAnimation = () => {
    const container = containerReference.current;
    const boxes = boxesReference.current;

    if (!container) return;

    // Initialize positions and velocities
    const state = languages.map((_, index) => ({
      left: Math.random() * (container.offsetWidth - (boxes[index]?.offsetWidth || 0)),
      opacity: 0,
      top: Math.random() * (container.offsetHeight - (boxes[index]?.offsetHeight || 0)),
      velocityX: Math.random() * SPEED_LEVEL + 1,
      velocityY: Math.random() * SPEED_LEVEL + 1,
    }));

    animate(container, state, boxes);
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <div ref={containerReference} className="absolute inset-0 w-full h-fill overflow-hidden -z-10">
      {languages.map((language, index) => (
        <div
          ref={(element) => {
            boxesReference.current[index] = element;
          }}
          key={language.name}
          className="rounded-xl p-5 bg-black border border-zinc-800 absolute animate-move opacity-0"
        >
          {cloneElement(language.icon, { className: 'icon', size: 50 })}
        </div>
      ))}
    </div>
  );
};

export default LanguagesGrid;
