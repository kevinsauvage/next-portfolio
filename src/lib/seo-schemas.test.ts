import { projects } from '@/config/content/projects';

import { breadcrumbSchema, projectsSchema, SITE_URL } from './seo-schemas';

import { describe, expect, it } from 'vitest';

describe('seo schemas', () => {
  it('describes every project as a schema.org Project item', () => {
    expect(projectsSchema.itemListElement).toHaveLength(projects.length);
    const serialized = JSON.stringify(projectsSchema);
    expect(serialized).toContain('"@type":"Project"');
    expect(serialized).toContain(projects[0]?.websiteLink ?? '');
    expect(serialized).toContain(projects[0]?.title ?? '');
  });

  it('exposes a home breadcrumb', () => {
    expect(breadcrumbSchema['@type']).toBe('BreadcrumbList');
    expect(breadcrumbSchema.itemListElement[0]).toMatchObject({
      item: SITE_URL,
      name: 'Home',
      position: 1,
    });
  });
});
