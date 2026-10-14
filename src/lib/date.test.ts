import { toDateTime } from './date';

import { describe, expect, it } from 'vitest';

describe('toDateTime', () => {
  it('converts "Month YYYY" labels', () => {
    expect(toDateTime('September 2025')).toBe('2025-09');
    expect(toDateTime(' march 2024 ')).toBe('2024-03');
  });

  it('keeps a bare year', () => {
    expect(toDateTime('2026')).toBe('2026');
  });

  it('returns undefined for anything else', () => {
    expect(toDateTime('Present')).toBeUndefined();
    expect(toDateTime('Smarch 2025')).toBeUndefined();
  });
});
