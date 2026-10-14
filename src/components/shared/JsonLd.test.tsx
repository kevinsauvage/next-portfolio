import JsonLd from './JsonLd';

import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/csp-nonce', () => ({ getNonce: async () => 'test-nonce' }));

const scriptsOf = async (data: readonly object[]) => {
  const { container } = render(await JsonLd({ data }));
  return [...container.querySelectorAll('script[type="application/ld+json"]')];
};

describe('JsonLd', () => {
  it('renders one nonce-bearing script per schema with valid JSON', async () => {
    const scripts = await scriptsOf([{ '@type': 'A' }, { '@type': 'B' }]);

    expect(scripts).toHaveLength(2);
    expect(scripts[0]?.getAttribute('nonce')).toBe('test-nonce');
    expect(JSON.parse(scripts[1]?.textContent ?? '')).toEqual({ '@type': 'B' });
  });

  it('escapes "<" so content cannot close the script element', async () => {
    const [script] = await scriptsOf([{ name: '</script><b>' }]);

    expect(script?.textContent).not.toContain('<');
    expect(JSON.parse(script?.textContent ?? '')).toEqual({ name: '</script><b>' });
  });
});
