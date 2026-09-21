import { projects } from '@/config/content/projects';

import sitemap from './sitemap';

import { describe, expect, it } from 'vitest';

describe('sitemap', () => {
  it('lists the home route with a stable lastModified date', () => {
    const entries = sitemap();
    const home = entries[0];

    expect(home?.url).toBe('https://www.kevin-sauvage.com');
    expect(home?.changeFrequency).toBe('monthly');
    expect(home?.priority).toBe(1);
    expect(home?.lastModified).toBeInstanceOf(Date);
    expect(Number.isNaN((home?.lastModified as Date).getTime())).toBe(false);
  });

  it('lists every project case study route', () => {
    const entries = sitemap();
    const projectUrls = entries.map(entry => entry.url).filter(url => url.includes('/projects/'));

    expect(projectUrls).toHaveLength(projects.length);
    for (const project of projects) {
      expect(projectUrls).toContain(`https://www.kevin-sauvage.com/projects/${project.slug}`);
    }
  });
});
