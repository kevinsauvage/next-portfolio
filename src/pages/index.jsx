import PageLayout from '@/components/PageLayout/PageLayout';
import sections from '@/config/sections';

const Home = () => (
  <PageLayout>
    {sections.map((section) => (
      <section.component key={section.label} {...section} />
    ))}
  </PageLayout>
);

export default Home;
