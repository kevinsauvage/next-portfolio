import competences from '../../data/competences';
import { skillsIcon } from '../../data/svg';
import FadeIn from '../FadeIn/FadeIn';
import Section from '../Section/Section';
import Title from '../Title/Title';
import UpTitle from '../Uptitle/UpTitle';

import CompetenceCard from './CompetenceCard/CompetenceCard';

import styles from './What.module.scss';

const What = () => (
  <Section id="what">
    <UpTitle text="What" icon={skillsIcon} />
    <Title subtitle="Discover the range of skills and tools I utilize to bring projects to life and achieve outstanding results.">
      Languages & Skills
    </Title>
    <div className={styles.items}>
      {competences.map((item) => (
        <CompetenceCard item={item} key={item.description} />
      ))}
    </div>
  </Section>
);

export default What;
