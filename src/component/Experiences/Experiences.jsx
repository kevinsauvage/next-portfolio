import React from 'react';

import experiences from '../../data/experiences';
import { experienceIcon } from '../../data/svg';
import Section from '../Section/Section';
import Title from '../Title/Title';
import UpTitle from '../Uptitle/UpTitle';

import ExperiencesCard from './experiencesCard/ExperiencesCard';

import styles from './Experiences.module.scss';

const Experiences = () => (
  <Section id="experience">
    <UpTitle text="Experience" icon={experienceIcon} />
    <Title subtitle="Explore my work history and achievements in the related field, showcasing my professional journey and expertise.">
      Work history
    </Title>
    <ul className={styles.list}>
      {experiences.map((experience) => (
        <ExperiencesCard key={experience.period} experience={experience} />
      ))}
    </ul>
  </Section>
);

export default Experiences;
