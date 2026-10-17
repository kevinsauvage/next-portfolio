import JsonLd from './JsonLd';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const scriptsOf = (data: readonly object[]) => {
  const { container } = render(JsonLd({ data }));
  return [...container.querySelectorAll('script[type="application/ld+json"]')];
};

describe('JsonLd', () => {
  it('renders one script per schema with valid JSON', () => {
    const scripts = scriptsOf([{ '@type': 'A' }, { '@type': 'B' }]);

    expect(scripts).toHaveLength(2);
    expect(JSON.parse(scripts[1]?.textContent ?? '')).toEqual({ '@type': 'B' });
  });

  it('escapes "<" so content cannot close the script element', () => {
    const [script] = scriptsOf([{ name: '</script><b>' }]);

    expect(script?.textContent).not.toContain('<');
    expect(JSON.parse(script?.textContent ?? '')).toEqual({ name: '</script><b>' });
  });
});
