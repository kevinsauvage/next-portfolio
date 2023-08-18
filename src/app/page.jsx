import { cloneElement } from 'react';

import SectionPresenter from '@/components/_scopes/section/SectionPresenter/SectionPresenter';
import sections from '@/config/sections';

const Home = () =>
  sections.map((section, index) => (
    <SectionPresenter key={section.label} {...section} tagLevel={index + 1}>
      {cloneElement(section.component, { ...section })}
    </SectionPresenter>
  ));

export default Home;
