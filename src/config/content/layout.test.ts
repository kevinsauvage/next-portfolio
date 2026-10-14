import { NAVIGATION_SECTION_IDS, sectionIdFromHref } from './layout';

import { describe, expect, it } from 'vitest';

describe('layout content', () => {
  it('derives a section id from a home-anchored href', () => {
    expect(sectionIdFromHref('/#about')).toBe('about');
    expect(sectionIdFromHref('/#home')).toBe('home');
  });

  it('lists one unique id per navigation item', () => {
    expect(NAVIGATION_SECTION_IDS).toContain('portfolio');
    expect(NAVIGATION_SECTION_IDS).toHaveLength(7);
    expect(new Set(NAVIGATION_SECTION_IDS).size).toBe(NAVIGATION_SECTION_IDS.length);
  });
});
