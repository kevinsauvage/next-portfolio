import { accessibility, accessibilityFooterLabel, COMPLIANCE_LABELS } from './accessibility';

import { describe, expect, it } from 'vitest';

describe('accessibility statement content', () => {
  it('derives the footer mention from the declared status', () => {
    expect(accessibilityFooterLabel).toBe(
      `Accessibility: ${COMPLIANCE_LABELS[accessibility.status]}`
    );
  });

  it('only reports a compliance rate once the site is audited', () => {
    if (accessibility.status === 'non-compliant' && accessibility.complianceRate === null) return;
    expect(accessibility.complianceRate).toBeGreaterThanOrEqual(
      accessibility.status === 'fully-compliant' ? 100 : 50
    );
  });

  it('gives every section a unique anchor id', () => {
    const ids = accessibility.sections.map(section => section.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
