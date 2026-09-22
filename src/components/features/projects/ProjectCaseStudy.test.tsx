import { sections } from '@/config/content';
import { type Project, projects } from '@/config/content/projects';

import ProjectCaseStudy from './ProjectCaseStudy';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/analytics', () => ({ trackEvent: vi.fn() }));

const project = projects[0] as Project;
const caseStudy = project.caseStudy as NonNullable<Project['caseStudy']>;
const caseStudySections = sections.portfolio.caseStudy;

describe('ProjectCaseStudy', () => {
  it('renders the hero, overview and feature sections', () => {
    render(<ProjectCaseStudy project={project} />);

    expect(screen.getByRole('heading', { level: 1, name: project.title })).toBeInTheDocument();
    expect(screen.getByText(caseStudy.tagline)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: caseStudySections.overviewTitle })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: caseStudySections.featuresTitle })
    ).toBeInTheDocument();

    const liveLinks = screen.getAllByRole('link', { name: /view live/i });
    expect(liveLinks.length).toBeGreaterThan(0);
    for (const link of liveLinks) {
      expect(link).toHaveAttribute('href', project.websiteLink);
    }
  });

  it('renders nothing when the project has no case study', () => {
    const { caseStudy: _caseStudy, ...withoutCaseStudy } = project;
    const { container } = render(<ProjectCaseStudy project={withoutCaseStudy} />);

    expect(container).toBeEmptyDOMElement();
  });
});
