import Section from '@/components/_scopes/section/Section/Section';
import experiences from '@/data/experiences';

import ExperiencesCard from './Experience/Experience';

import styles from './Experiences.module.scss';

const Experiences = ({ ...rest }) => (
  <Section {...rest}>
    <ul className={styles.list}>
      {experiences.map((experience) => (
        <ExperiencesCard key={experience.period} experience={experience} />
      ))}
    </ul>
  </Section>
);

export default Experiences;
