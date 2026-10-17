import { layout } from '@/config/content';

import JsonLd from './JsonLd';
import StructuredData from './StructuredData';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const renderSchemas = async () => {
  const { container } = render(JsonLd(StructuredData().props));
  return [...container.querySelectorAll('script[type="application/ld+json"]')].map(
    script => JSON.parse(script.textContent ?? '') as Record<string, unknown>
  );
};

describe('StructuredData', () => {
  it('emits the site-wide schemas, each with a schema.org context', async () => {
    const schemas = await renderSchemas();

    expect(schemas.map(schema => schema['@type'])).toEqual(
      expect.arrayContaining(['Person', 'WebSite', 'SiteNavigationElement'])
    );
    for (const schema of schemas) {
      expect(schema['@context']).toBe('https://schema.org');
    }
  });

  it('builds absolute navigation URLs from the header items', async () => {
    const schemas = await renderSchemas();
    const navigation = schemas.find(schema => schema['@type'] === 'SiteNavigationElement');
    const { items } = layout.header.navigation;

    expect(navigation?.['name']).toEqual(items.map(item => item.label));
    expect(navigation?.['url']).toEqual(
      items.map(item => `https://www.kevin-sauvage.com${item.href}`)
    );
  });
});
