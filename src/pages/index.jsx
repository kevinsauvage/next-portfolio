import { Suspense } from 'react';

import Section from '@/components/_scopes/section/Section/Section';
import PageLayout from '@/components/PageLayout/PageLayout';
import sections from '@/config/sections';

const Home = () => (
  <PageLayout>
    {sections.map((section, index) => (
      <Section key={section.label} {...section} tagLevel={index + 2}>
        <Suspense>
          <section.component {...section} />
        </Suspense>
      </Section>
    ))}
  </PageLayout>
);

export default Home;
