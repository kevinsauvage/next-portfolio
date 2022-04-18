import Head from "next/head";
import PageLayout from "../../layout/PageLayout/PageLayout";
import projects from "../../data/projects";
import ProjectBanner from "../../layout/ProjectBanner/ProjectBanner";
import ProjectSection from "../../layout/ProjectSection/ProjectSection";
import { useEffect } from "react";

export default function Index({ project }) {
  useEffect(() => window.scroll({ top: 0 }), []);

  return (
    <PageLayout>
      <Head>
        <title>Kevin sauvage | Project: {project.title}</title>
      </Head>
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
  const paths = projects.map((item) => ({
    params: { slug: item.title },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const project = projects.filter((item) => item.title === params.slug);
  return {
    props: { project: project[0] },
  };
}
