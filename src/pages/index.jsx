import Section from '@/components/_scopes/section/Section/Section';
import PageLayout from '@/components/PageLayout/PageLayout';
import sections from '@/config/sections';

const Home = () => (
  <PageLayout>
    {sections.map((section, index) => (
      <Section key={section.label} {...section} tagLevel={index + 1}>
        <section.component {...section} />
      </Section>
    ))}
  </PageLayout>
);

export default Home;
