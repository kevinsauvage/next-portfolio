import Section from '@/components/_scopes/section/Section/Section';
import SectionPresenter from '@/components/_scopes/section/SectionPresenter/SectionPresenter';
import SectionTitle from '@/components/_scopes/section/SectionTitle/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUptitle/SectionUpTitle';
import sections, { Sections } from '@/config/sections';

import AboutItem from '../../cards/AboutItem/AboutItem';

import about from './about.config';

import styles from './About.module.scss';

const label = 'About Me';
const section = sections.find((data) => data.label === label) as Sections[0];
const { icon, title, TitleTag } = section || {};

const About = () => (
  <SectionPresenter>
    <Section>
      <SectionUpTitle icon={icon} text={label} />
      <SectionTitle title={title} TitleTag={TitleTag} />
      <ul className={styles.about}>
        {about.map((item) => (
          <AboutItem key={item.content} item={item} />
        ))}
      </ul>
    </Section>
  </SectionPresenter>
);

export default About;
