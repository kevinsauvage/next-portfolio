import projects, { type Project } from './projects';

import { describe, expect, it } from 'vitest';

const nonEmpty = (value: string) => value.trim().length > 0;

describe('projects content', () => {
  it('exposes at least one project with the links the UI relies on', () => {
    expect(projects.length).toBeGreaterThan(0);

    for (const project of projects) {
      expect(nonEmpty(project.slug)).toBe(true);
      expect(nonEmpty(project.title)).toBe(true);
      expect(nonEmpty(project.description)).toBe(true);
      expect(project.websiteLink).toMatch(/^https?:\/\//);
      expect(project.images.thumbnail.src).toMatch(/^https?:\/\//);
      expect(project.images.thumbnail.alt).not.toBe('');
      expect(project.technologies.length).toBeGreaterThan(0);
    }
  });

  it('has unique slugs usable as case study routes', () => {
    const slugs = projects.map(({ slug }) => slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('provides a complete case study whenever one is declared', () => {
    const withCaseStudy = projects.filter(
      (project): project is Project & { caseStudy: NonNullable<Project['caseStudy']> } =>
        Boolean(project.caseStudy)
    );

    expect(withCaseStudy.length).toBeGreaterThan(0);

    for (const { caseStudy, title } of withCaseStudy) {
      expect(nonEmpty(caseStudy.tagline), `${title} tagline`).toBe(true);
      expect(caseStudy.overview.length, `${title} overview`).toBeGreaterThan(0);
      expect(caseStudy.facts.length, `${title} facts`).toBeGreaterThan(0);
      expect(caseStudy.features.length, `${title} features`).toBeGreaterThan(0);
      expect(caseStudy.technical.length, `${title} technical`).toBeGreaterThan(0);
      expect(caseStudy.responsibilities.length, `${title} responsibilities`).toBeGreaterThan(0);
      expect(caseStudy.quality.length, `${title} quality`).toBeGreaterThan(0);

      for (const fact of caseStudy.facts) {
        expect(nonEmpty(fact.label)).toBe(true);
        expect(nonEmpty(fact.value)).toBe(true);
      }
      for (const entry of [...caseStudy.features, ...caseStudy.technical]) {
        expect(nonEmpty(entry.title)).toBe(true);
        expect(nonEmpty(entry.description)).toBe(true);
      }
    }
  });
});
