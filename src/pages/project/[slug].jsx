import ProjectBanner from '../../component/ProjectBanner/ProjectBanner';
import ProjectSection from '../../component/ProjectSection/ProjectSection';
import projects from '../../data/projects';
import PageLayout from '../../layout/PageLayout/PageLayout';

const Index = ({ project }) => (
  <PageLayout title={`Project: ${project.title}`}>
    <ProjectBanner project={project} />
    {project.page.blocs.map((item, index) => (
      <ProjectSection
        key={item.title}
        image={item.image}
        title={item.title}
        description={item.description}
        direction={index % 2 === 0 ? 'row' : 'row-reverse'}
      />
    ))}
  </PageLayout>
);

export default Index;

export async function getStaticPaths() {
  const paths = projects.map((item) => ({ params: { slug: item.title } }));
  return { fallback: false, paths };
}

export async function getStaticProps({ params }) {
  const project = projects.find((item) => item.title === params.slug);
  return { props: { project } };
}
