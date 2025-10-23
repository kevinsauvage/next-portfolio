import { getStaggerDelay, getTypographyClasses } from '../tokens';

import { describe, expect, it } from 'vitest';

describe('Design Tokens', () => {
  describe('getStaggerDelay', () => {
    it('calculates delay correctly', () => {
      expect(getStaggerDelay(0)).toBe('100ms');
      expect(getStaggerDelay(1)).toBe('200ms');
      expect(getStaggerDelay(2)).toBe('300ms');
    });

    it('respects max delay', () => {
      expect(getStaggerDelay(10, 100, 100, 800)).toBe('800ms');
    });

    it('works with custom values', () => {
      expect(getStaggerDelay(0, 50, 50, 500)).toBe('50ms');
      expect(getStaggerDelay(2, 50, 50, 500)).toBe('150ms');
    });
  });

  describe('getTypographyClasses', () => {
    it('returns typography classes for h1', () => {
      const classes = getTypographyClasses('h1');
      expect(classes).toContain('text-4xl');
      expect(classes).toContain('font-bold');
    });

    it('returns typography classes for body', () => {
      const classes = getTypographyClasses('body');
      expect(classes).toContain('text-base');
      expect(classes).toContain('leading-relaxed');
    });
  });
});
