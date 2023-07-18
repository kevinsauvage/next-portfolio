import Footer from '@/components/Footer/Footer';
import PageLayout from '@/components/PageLayout/PageLayout';
import sections from '@/config/sections';

const Home = () => (
  <PageLayout>
    {sections.map((section) => (
      <section.component key={section.label} {...section} />
    ))}
    <Footer />
  </PageLayout>
);

export default Home;
