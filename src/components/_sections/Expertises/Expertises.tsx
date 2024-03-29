import Section from '@/components/_scopes/section/Section/Section';
import SectionTitle from '@/components/_scopes/section/SectionTitle/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUptitle/SectionUpTitle';
import Accordion from '@/components/Accordion/Accordion';
import sections, { Sections } from '@/config/sections';
import { breakpoints } from '@/utils/breakpoints';

import Expertise from '../../_cards/Expertise/Expertise';

import expertise from './expertises.config';

import styles from './Expertises.module.scss';

const label = 'My Expertises';

const section = sections.find((data) => data.label === label) as Sections[0];
const { icon, title, position } = section || {};

const Expertises = () => (
  <Section format="large" id={section.id}>
    <SectionUpTitle icon={icon} text={label} />
    <SectionTitle title={title} position={position} />
    <Accordion
      className={styles.Expertise}
      Tag="ul"
      totalVisible={{
        [breakpoints.sm]: 3,
        [breakpoints.md]: 4,
        [breakpoints.xxl]: 6,
      }}
      defaultVisible={3}
    >
      {expertise.map((service, index) => (
        <Expertise expertise={service} key={service.title} index={index} />
      ))}
    </Accordion>
  </Section>
);

export default Expertises;
