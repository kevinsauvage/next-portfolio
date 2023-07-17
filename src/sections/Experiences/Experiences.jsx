import Section from '@/components/_scopes/section/Section/Section';
import experiences from '@/config/experiences';

import Experience from './Experience/Experience';

import styles from './Experiences.module.scss';

const Experiences = ({ ...rest }) => (
  <Section {...rest}>
    <ul className={styles.list}>
      {experiences.map((experience) => (
        <Experience key={experience.period} experience={experience} />
      ))}
    </ul>
  </Section>
);

export default Experiences;
