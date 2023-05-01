import competences from '../../data/competences';
import { skillsIcon } from '../../data/svg';
import CompetenceCard from '../CompetenceCard/CompetenceCard';
import Section from '../Section/Section';
import Title from '../Title/Title';
import UpTitle from '../Uptitle/UpTitle';

import styles from './What.module.scss';

const What = () => (
  <Section id="what">
    <UpTitle text="What" icon={skillsIcon} />
    <Title>Languages & Skills</Title>
    <div className={styles.items}>
      {competences.map((item) => (
        <CompetenceCard item={item} key={item.description} />
      ))}
    </div>
  </Section>
);

export default What;
