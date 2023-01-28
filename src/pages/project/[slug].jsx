import PageLayout from "../../layout/PageLayout/PageLayout";
import projects from "../../data/projects";
import ProjectBanner from "../../component/ProjectBanner/ProjectBanner";
import ProjectSection from "../../component/ProjectSection/ProjectSection";

export default function Index({ project }) {
  return (
    <PageLayout title={`Project: ${project.title}`}>
      <ProjectBanner project={project} />
      {project.page.blocs.map((item, i) => (
        <ProjectSection
          key={item.title}
          image={item.image}
          title={item.title}
          description={item.description}
          direction={i % 2 === 0 ? "row" : "row-reverse"}
        />
      ))}
    </PageLayout>
  );
}

export async function getStaticPaths() {
  const paths = projects.map((item) => ({ params: { slug: item.title } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = projects.filter((item) => item.title === params.slug);
  return { props: { project: project[0] } };
}
