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

  it('lists the privacy policy route', () => {
    const entries = sitemap();
    const privacyEntry = entries.find(entry => entry.url.endsWith('/privacy'));

    expect(privacyEntry?.url).toBe('https://www.kevin-sauvage.com/privacy');
    expect(privacyEntry?.changeFrequency).toBe('yearly');
    expect(privacyEntry?.priority).toBe(0.3);
  });

  it('lists the HTML site map', () => {
    const urls = sitemap().map(entry => entry.url);

    expect(urls).toContain('https://www.kevin-sauvage.com/site-map');
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
