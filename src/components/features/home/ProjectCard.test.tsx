import { type Project, projects } from '@/config/content/projects';

import ProjectCard from './ProjectCard';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }));

const project = projects[0] as Project;

describe('ProjectCard', () => {
  it('links to the case study and the live site', () => {
    render(<ProjectCard project={project} index={0} />);

    expect(screen.getByRole('link', { name: /read case study/i })).toHaveAttribute(
      'href',
      `/projects/${project.slug}`
    );
    expect(screen.getByRole('link', { name: /view live/i })).toHaveAttribute(
      'href',
      project.websiteLink
    );
  });

  it('shows a source link only when the repository is public', () => {
    const { rerender } = render(<ProjectCard project={{ ...project, githubLink: [] }} index={0} />);

    expect(screen.queryByRole('link', { name: /source code/i })).not.toBeInTheDocument();

    rerender(
      <ProjectCard
        project={{ ...project, githubLink: ['https://github.com/example/repo'] }}
        index={0}
      />
    );

    expect(screen.getByRole('link', { name: /source code/i })).toHaveAttribute(
      'href',
      'https://github.com/example/repo'
    );
  });

  it('renders the title and the technology tags', () => {
    render(<ProjectCard project={project} index={0} />);

    const firstTechnology = project.technologies[0] as { name: string };

    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(screen.getByText(firstTechnology.name)).toBeInTheDocument();
  });
});
