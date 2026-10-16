import robots from './robots';

import { describe, expect, it } from 'vitest';

describe('robots', () => {
  it('allows every crawler and points to the sitemap', () => {
    expect(robots()).toEqual({
      rules: { allow: '/', userAgent: '*' },
      sitemap: 'https://www.kevin-sauvage.com/sitemap.xml',
    });
  });
});
