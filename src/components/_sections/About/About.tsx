import Section from '@/components/_scopes/section/Section/Section';
import SectionTitle from '@/components/_scopes/section/SectionTitle/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUptitle/SectionUpTitle';
import sections, { Sections } from '@/config/sections';

import AboutItem from '../../_cards/AboutItem/AboutItem';

import about from './about.config';

import styles from './About.module.scss';

const label = 'About Me';
const section = sections.find((data) => data.label === label) as Sections[0];
const { icon, title, position } = section || {};

const About = () => (
  <Section id={section.id}>
    <SectionUpTitle icon={icon} text={label} />
    <SectionTitle title={title} position={position} />
    <ul className={styles.about}>
      {about.map((item) => (
        <AboutItem key={item.content} item={item} />
      ))}
    </ul>
  </Section>
);

export default About;
