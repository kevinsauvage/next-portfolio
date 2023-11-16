import Section from '@/components/_scopes/section/Section/Section';
import SectionPresenter from '@/components/_scopes/section/SectionPresenter/SectionPresenter';
import SectionTitle from '@/components/_scopes/section/SectionTitle/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUptitle/SectionUpTitle';
import about from '@/config/about';
import sections, { Sections } from '@/config/sections';

import AboutItem from './AboutItem/AboutItem';
import { aboutItem } from './types';

import styles from './About.module.scss';

const label = 'About Me';
const section = sections.find((data) => data.label === label) as Sections[0];
const { icon, title, tagLevel } = section || {};

const About = () => (
  <SectionPresenter>
    <Section>
      <SectionUpTitle icon={icon} text={label} />
      <SectionTitle title={title} tagLevel={tagLevel} />
      <ul className={styles.about}>
        {about.map((item: aboutItem) => (
          <AboutItem key={item.content} content={item.content} />
        ))}
      </ul>
    </Section>
  </SectionPresenter>
);

export default About;
