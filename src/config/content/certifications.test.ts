import { toDateTime } from '@/lib/utils/date';

import { certifications } from './certifications';
import testimonials from './testimonials';

import { describe, expect, it } from 'vitest';

describe('certifications content', () => {
  it('only links credentials over http(s) or site-relative paths', () => {
    for (const { id, credentialUrl } of certifications) {
      if (!credentialUrl) continue;
      const valid = credentialUrl.startsWith('/') || /^https?:\/\//.test(credentialUrl);
      expect(valid, `${id} has an unsafe credentialUrl`).toBe(true);
    }
  });

  it('uses unique ids', () => {
    const ids = certifications.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has dates that map to a machine-readable <time> value', () => {
    for (const { date } of [...certifications, ...testimonials]) {
      expect(toDateTime(date), `unparseable date "${date}"`).toBeDefined();
    }
  });
});
