import projects, { type Project } from '@/config/content/projects';

import JsonLd from './JsonLd';
import ProjectStructuredData from './ProjectStructuredData';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

type Schema = Record<string, unknown>;

const renderSchemas = async (project: Project) => {
  const { container } = render(JsonLd(ProjectStructuredData({ project }).props));
  const scripts = [...container.querySelectorAll('script[type="application/ld+json"]')];
  const [breadcrumb, work] = scripts.map(script => JSON.parse(script.textContent ?? '') as Schema);
  return { breadcrumb, work };
};

const findProject = (predicate: (project: Project) => boolean): Project => {
  const project = projects.find(predicate);
  if (!project) throw new Error('No project matches the fixture predicate');
  return project;
};

const firstProject = findProject(() => true);
const withGithub = findProject(project => Boolean(project.githubUrl));
const withoutGithub = findProject(project => !project.githubUrl);

describe('ProjectStructuredData', () => {
  it('ends the breadcrumb at the project case study URL', async () => {
    const project = firstProject;
    const { breadcrumb } = await renderSchemas(project);
    const items = breadcrumb?.['itemListElement'] as Schema[];

    expect(items.map(item => item['position'])).toEqual([1, 2, 3]);
    expect(items.at(-1)).toMatchObject({
      item: `https://www.kevin-sauvage.com/projects/${project.slug}`,
      name: project.title,
    });
  });

  it('describes the project as a CreativeWork with its technologies as keywords', async () => {
    const project = firstProject;
    const { work } = await renderSchemas(project);

    expect(work).toMatchObject({
      '@type': 'CreativeWork',
      description: project.caseStudy.tagline,
      keywords: project.technologies.map(({ name }) => name).join(', '),
      name: project.title,
    });
  });

  it('links the GitHub repository only when the project has one', async () => {
    expect((await renderSchemas(withGithub)).work?.['sameAs']).toEqual([withGithub.githubUrl]);
    expect((await renderSchemas(withoutGithub)).work).not.toHaveProperty('sameAs');
  });
});
