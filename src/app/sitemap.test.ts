import sitemap from './sitemap';

import { describe, expect, it } from 'vitest';

describe('sitemap', () => {
  it('lists the home route with a stable lastModified date', () => {
    const entries = sitemap();

    expect(entries).toHaveLength(1);
    expect(entries[0]?.url).toBe('https://www.kevin-sauvage.com');
    expect(entries[0]?.changeFrequency).toBe('monthly');
    expect(entries[0]?.priority).toBe(1);
    expect(entries[0]?.lastModified).toBeInstanceOf(Date);
    expect(Number.isNaN((entries[0]?.lastModified as Date).getTime())).toBe(false);
  });
});
