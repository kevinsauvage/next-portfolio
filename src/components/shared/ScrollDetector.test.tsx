import ScrollDetector from './ScrollDetector';

import { render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

const SCROLLED = 'page-scrolled';
const SCROLLED_FAR = 'page-scrolled-far';

const setScrollY = (value: number) => {
  Object.defineProperty(window, 'scrollY', { configurable: true, value });
};

const flush = () => new Promise(resolve => requestAnimationFrame(() => resolve(null)));

describe('ScrollDetector', () => {
  afterEach(() => {
    document.documentElement.classList.remove(SCROLLED, SCROLLED_FAR);
    setScrollY(0);
  });

  it('mirrors scroll depth onto <html> classes (the BackToTopButton contract)', async () => {
    render(<ScrollDetector />);

    setScrollY(400);
    window.dispatchEvent(new Event('scroll'));
    await flush();

    expect(document.documentElement.classList.contains(SCROLLED)).toBe(true);
    expect(document.documentElement.classList.contains(SCROLLED_FAR)).toBe(true);
  });

  it('clears the classes near the top', async () => {
    document.documentElement.classList.add(SCROLLED, SCROLLED_FAR);
    render(<ScrollDetector />);

    setScrollY(0);
    window.dispatchEvent(new Event('scroll'));
    await flush();

    expect(document.documentElement.classList.contains(SCROLLED)).toBe(false);
    expect(document.documentElement.classList.contains(SCROLLED_FAR)).toBe(false);
  });
});
