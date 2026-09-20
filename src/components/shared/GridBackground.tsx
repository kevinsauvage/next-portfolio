import type { CSSProperties } from 'react';

type GridBackgroundProps = {
  /** Size of one grid cell in px. Defaults to 64. */
  cellSize?: number;
  /** Opacity of the grid lines (0-1). Defaults to 0.05. */
  lineOpacity?: number;
  /** Extra class names for positioning (parent must be relative). */
  className?: string;
};

/**
 * Vercel-style squared grid background: thin lines forming squares,
 * fading out toward the edges with a radial mask. Pure CSS, no images.
 * Render inside a `relative` parent, below content (content uses z-10).
 */
const GridBackground = ({ cellSize = 64, lineOpacity = 0.05, className }: GridBackgroundProps) => {
  const line = `rgb(255 255 255 / ${lineOpacity})`;
  const style: CSSProperties = {
    backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
    backgroundSize: `${cellSize}px ${cellSize}px`,
    maskImage:
      'radial-gradient(ellipse 90% 70% at 50% 35%, black 25%, transparent 78%)',
    WebkitMaskImage:
      'radial-gradient(ellipse 90% 70% at 50% 35%, black 25%, transparent 78%)',
  };

  return (
    <div
      aria-hidden='true'
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}
      style={style}
    />
  );
};

export default GridBackground;
