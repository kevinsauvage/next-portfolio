import competences from '../../data/competences';
import CompetenceCard from '../CompetenceCard/CompetenceCard';
import Section from '../Section/Section';
import Title from '../Title/Title';
import UpTitle from '../UpTitle/UpTitle';

import styles from './What.module.scss';

const What = () => (
  <Section id="skills">
    <UpTitle text="FEATURES" />
    <Title>Skills</Title>
    <div className={styles.items}>
      {competences.map((item) => (
        <CompetenceCard item={item} key={item.description} />
      ))}
    </div>
  </Section>
);

export default What;
