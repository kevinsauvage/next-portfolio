import experiences from '@/config/experiences';

import Experience from './Experience/Experience';

import styles from './Experiences.module.scss';

const Experiences = () => (
  <ul className={styles.list}>
    {experiences.map((experience) => (
      <Experience key={experience.period} experience={experience} />
    ))}
  </ul>
);

export default Experiences;
