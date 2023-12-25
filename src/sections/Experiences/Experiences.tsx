import Link from 'next/link';

import Section from '@/components/_scopes/section/Section/Section';
import SectionPresenter from '@/components/_scopes/section/SectionPresenter/SectionPresenter';
import SectionTitle from '@/components/_scopes/section/SectionTitle/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUptitle/SectionUpTitle';
import TabList from '@/components/TabList/TabList';
import sections, { Sections } from '@/config/sections';

import Experience from '../../cards/Experience/Experience';

import experiences from './experiences.config';

import styles from './Experiences.module.scss';

const label = 'My Experience';

const section = sections.find((data) => data.label === label) as Sections[0];
const { icon, title, TitleTag } = section || {};

const Experiences = () => (
  <SectionPresenter>
    <Section>
      <SectionUpTitle icon={icon} text={label} />
      <SectionTitle title={title} TitleTag={TitleTag} />
      <TabList items={experiences.map((experience) => experience.tab)}>
        {experiences.map((experience) => (
          <Experience key={experience.period} experience={experience} />
        ))}
      </TabList>
      <Link
        href="/kevin-sauvage-cv.pdf"
        className={styles.link}
        aria-label="Download full resume"
        target="_blank"
        prefetch={false}
        rel="noopener noreferrer"
        title="Download full resume"
        download
      >
        Download Full Resume
      </Link>
    </Section>
  </SectionPresenter>
);

export default Experiences;
