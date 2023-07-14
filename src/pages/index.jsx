import PageLayout from '@/components/PageLayout/PageLayout';
import config from '@/config';

const Home = () => (
  <PageLayout>
    {config.sections.map((section) => (
      <section.component key={section.label} {...section} />
    ))}
  </PageLayout>
);

export default Home;
