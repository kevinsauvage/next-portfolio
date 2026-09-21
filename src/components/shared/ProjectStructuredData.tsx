import { headers } from 'next/headers';

import type { Project } from '@/config/content/projects';
import { PERSON_NAME, SCHEMA_CONTEXT, SITE_URL } from '@/lib/seo-schemas';

const ProjectStructuredData = async ({ project }: { project: Project }) => {
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  const url = `${SITE_URL}/projects/${project.slug}`;
  const description = project.caseStudy?.tagline ?? project.description;

  const breadcrumbSchema = {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', item: SITE_URL, name: 'Home', position: 1 },
      { '@type': 'ListItem', item: `${SITE_URL}/#portfolio`, name: 'Portfolio', position: 2 },
      { '@type': 'ListItem', item: url, name: project.title, position: 3 },
    ],
  };

  const workSchema = {
    '@context': SCHEMA_CONTEXT,
    '@type': 'CreativeWork',
    name: project.title,
    description,
    url,
    author: { '@type': 'Person', name: PERSON_NAME, url: SITE_URL },
    keywords: project.technologies.map(({ name }) => name).join(', '),
    sameAs: project.githubLink,
    ...(project.caseStudy?.tagline ? { abstract: project.caseStudy.tagline } : {}),
  };

  return (
    <>
      <script
        type='application/ld+json'
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type='application/ld+json'
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }}
      />
    </>
  );
};

export default ProjectStructuredData;
