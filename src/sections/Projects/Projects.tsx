import Section from '@/components/_scopes/section/Section/Section';
import SectionPresenter from '@/components/_scopes/section/SectionPresenter/SectionPresenter';
import SectionTitle from '@/components/_scopes/section/SectionTitle/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUptitle/SectionUpTitle';
import sections, { Sections } from '@/config/sections';

import Project from '../../cards/Project/Project';

import projects from './projects.config';

import styles from './Projects.module.scss';

const label = 'My Projects';
const section = sections.find((data) => data.label === label) as Sections[0];
const { icon, title, TitleTag } = section || {};

const Projects = () => (
  <SectionPresenter>
    <Section>
      <SectionUpTitle icon={icon} text={label} />
      <SectionTitle title={title} TitleTag={TitleTag} />
      <ul className={styles.Projects}>
        {projects.map((item) => (
          <Project key={item.title} item={item} />
        ))}
      </ul>
    </Section>
  </SectionPresenter>
);

export default Projects;
