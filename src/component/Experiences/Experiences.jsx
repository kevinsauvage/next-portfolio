import experiences from '../../data/experiences';
import { experienceIcon } from '../../data/svg';
import Section from '../Section/Section';

import ExperiencesCard from './experiencesCard/ExperiencesCard';

import styles from './Experiences.module.scss';

const Experiences = () => (
  <Section
    id="experience"
    icon={experienceIcon}
    title="Work history"
    subtitle="Explore my work history and achievements in the related field, showcasing my professional journey and expertise."
  >
    <ul className={styles.list}>
      {experiences.map((experience) => (
        <ExperiencesCard key={experience.period} experience={experience} />
      ))}
    </ul>
  </Section>
);

export default Experiences;
