import { privacy } from './privacy';

import { describe, expect, it } from 'vitest';

describe('privacy content', () => {
  it('uses unique anchor ids and unique table-of-contents labels', () => {
    const ids = privacy.sections.map(section => section.id);
    const shortTitles = privacy.sections.map(section => section.shortTitle);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(shortTitles).size).toBe(shortTitles.length);
  });

  it('numbers every section and gives it something to render', () => {
    for (const section of privacy.sections) {
      expect(section.title).toMatch(/^\d+\.\s\S/);
      expect(
        Boolean(section.paragraphs?.length) || Boolean(section.lists?.length) || section.cookieTable
      ).toBe(true);
    }
  });

  it('keeps the machine-readable date in sync with the display copy', () => {
    expect(Number.isNaN(Date.parse(privacy.lastUpdated))).toBe(false);
    expect(new Date(privacy.lastUpdated).getUTCFullYear()).toBe(
      Number(privacy.lastUpdatedDisplay.slice(-4))
    );
  });

  it('covers the contact, cookie-table and cookie-settings blocks the component renders', () => {
    expect(privacy.sections.filter(section => section.contact)).toHaveLength(2);
    expect(privacy.sections.some(section => section.cookieTable)).toBe(true);
    expect(privacy.sections.some(section => section.cookieSettings)).toBe(true);
  });
});
