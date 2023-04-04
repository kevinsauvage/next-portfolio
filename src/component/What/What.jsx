import CompetenceCard from '../CompetenceCard/CompetenceCard';
import Section from '../Section/Section';
import Title from '../Title/Title';
import UpTitle from '../UpTitle/UpTitle';

import styles from './What.module.scss';

const What = () => (
  <Section id="skills">
    <UpTitle text="FEATURES" />
    <Title>Skills</Title>
    <div className={styles.cards}>
      <CompetenceCard />
    </div>
  </Section>
);

export default What;
