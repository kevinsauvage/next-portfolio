import competences from '../../data/competences';
import CompetenceCard from '../CompetenceCard/CompetenceCard';
import Section from '../Section/Section';
import Title from '../Title/Title';

import styles from './What.module.scss';

const What = () => (
  <Section id="skills">
    <Title>Skills</Title>
    <div className={styles.items}>
      {competences.map((item) => (
        <CompetenceCard item={item} key={item.description} />
      ))}
    </div>
  </Section>
);

export default What;
