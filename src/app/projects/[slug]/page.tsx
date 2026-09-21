import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProjectCaseStudy from '@/components/features/projects/ProjectCaseStudy';
import ProjectStructuredData from '@/components/shared/ProjectStructuredData';
import { projects } from '@/config/content/projects';
import { SITE_URL } from '@/lib/seo-schemas';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export const generateStaticParams = () => projects.map(({ slug }) => ({ slug }));

export const generateMetadata = async ({ params }: ProjectPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const project = projects.find(candidate => candidate.slug === slug);
  if (!project) return {};

  const description = project.caseStudy?.tagline ?? project.description;
  const url = `${SITE_URL}/projects/${project.slug}`;

  return {
    alternates: { canonical: url },
    description,
    openGraph: {
      description,
      images: [{ alt: project.images.thumbnail.alt, url: project.images.thumbnail.src }],
      title: `${project.title} — case study`,
      type: 'article',
      url,
    },
    title: project.title,
    twitter: {
      card: 'summary_large_image',
      description,
      title: `${project.title} — case study`,
    },
  };
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { slug } = await params;
  const project = projects.find(candidate => candidate.slug === slug);
  if (!project) notFound();

  return (
    <>
      <ProjectStructuredData project={project} />
      <ProjectCaseStudy project={project} />
    </>
  );
};

export default ProjectPage;
