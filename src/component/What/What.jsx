import competences from '../../data/competences';
import { skillsIcon } from '../../data/svg';
import Section from '../Section/Section';

import CompetenceCard from './CompetenceCard/CompetenceCard';

import styles from './What.module.scss';

const What = () => (
  <Section
    id="what"
    icon={skillsIcon}
    title="Languages & Skills"
    subtitle="Discover the range of skills and tools I utilize to bring projects to life and achieve outstanding results."
  >
    <div className={styles.items}>
      {competences.map((item) => (
        <CompetenceCard item={item} key={item.description} />
      ))}
    </div>
  </Section>
);

export default What;
