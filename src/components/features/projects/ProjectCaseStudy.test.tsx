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

  it('keeps the hero overline and meta on an explicit dark background', () => {
    render(<ProjectCaseStudy project={project} />);

    // Contrast checkers only read ancestor background-color values, not the
    // absolutely positioned <MeshGradient> sibling painted behind them — an
    // explicit opaque background keeps the accent-coloured 12px text readable
    // for those tools instead of falling back to white.
    const hero = screen.getByText(caseStudySections.overline).closest('header');
    expect(hero).toHaveClass('bg-black');
    expect(screen.getByText(`${project.role} · ${project.timeline}`)).toBeInTheDocument();
  });
});
