import { cloneElement } from 'react';

import SectionPresenter from '@/components/_scopes/section/SectionPresenter/SectionPresenter';
import sections from '@/config/sections';

const Home = () => (
  <div>
    {sections.map(
      (section) =>
        section.component && (
          <SectionPresenter key={section.label} {...section} tagLevel={section.tagLevel}>
            {cloneElement(section.component, { ...section })}
          </SectionPresenter>
        )
    )}
  </div>
);

export default Home;
