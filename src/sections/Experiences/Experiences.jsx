import Link from 'next/link';

import Section from '@/components/_scopes/section/Section/Section';
import SectionPresenter from '@/components/_scopes/section/SectionPresenter/SectionPresenter';
import SectionTitle from '@/components/_scopes/section/SectionTitle/SectionTitle';
import SectionUpTitle from '@/components/_scopes/section/SectionUptitle/SectionUpTitle';
import experiences from '@/config/experiences';
import sections from '@/config/sections';
import IconArrowRight from '@/svg/IconArrowRight';

import Experience from './Experience/Experience';

import styles from './Experiences.module.scss';

const label = 'My Experience';

const section = sections.find((data) => data.label === label);
const { icon, title, tagLevel } = section || {};

const Experiences = () => (
  <SectionPresenter label={label}>
    <Section>
      <SectionUpTitle icon={icon} text={label} />
      <SectionTitle title={title} tagLevel={tagLevel} />
      <div className={styles.experiences}>
        <ul className={styles.list}>
          {experiences.map((experience) => (
            <Experience key={experience.period} experience={experience} />
          ))}
        </ul>
        <Link
          href="/kevin-sauvage-cv.pdf"
          className={styles.link}
          aria-label="View Full Résumém"
          target="_blank"
          prefetch={false}
          rel="noopener noreferrer"
          title="View Full Résumé"
        >
          View Full Résumé
          <IconArrowRight />
        </Link>
      </div>
    </Section>
  </SectionPresenter>
);

export default Experiences;
