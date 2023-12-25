import Section from '@/components/_scopes/section/Section/Section';
import SectionPresenter from '@/components/_scopes/section/SectionPresenter/SectionPresenter';
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
const { icon, title, TitleTag } = section || {};

const Expertises = () => (
  <SectionPresenter>
    <Section format="large">
      <SectionUpTitle icon={icon} text={label} />
      <SectionTitle title={title} TitleTag={TitleTag} />
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
  </SectionPresenter>
);

export default Expertises;
