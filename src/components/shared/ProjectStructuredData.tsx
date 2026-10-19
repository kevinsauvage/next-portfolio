import JsonLd from '@/components/shared/JsonLd';
import { getProjectUrl, type Project } from '@/config/content/projects';
import { PERSON_NAME, SITE_URL } from '@/config/site';
import { SCHEMA_CONTEXT } from '@/lib/seo/schemas';

const ProjectStructuredData = ({ project }: { project: Project }) => {
  const url = getProjectUrl(project.slug);
  const description = project.caseStudy.tagline;

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
    ...(project.githubUrl && { sameAs: [project.githubUrl] }),
    abstract: description,
  };

  return <JsonLd data={[breadcrumbSchema, workSchema]} />;
};

export default ProjectStructuredData;
