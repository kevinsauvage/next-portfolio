import { padIndex } from './format';

import { describe, expect, it } from 'vitest';

describe('padIndex', () => {
  it('zero-pads single digits to two characters', () => {
    expect(padIndex(1)).toBe('01');
    expect(padIndex(9)).toBe('09');
  });

  it('leaves two-or-more-digit values unchanged', () => {
    expect(padIndex(12)).toBe('12');
    expect(padIndex(100)).toBe('100');
  });
});
