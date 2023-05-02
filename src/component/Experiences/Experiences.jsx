import React from 'react';

import experiences from '../../data/experiences';
import { experienceIcon } from '../../data/svg';
import Section from '../Section/Section';
import Title from '../Title/Title';
import UpTitle from '../Uptitle/UpTitle';

import ExperiencesCard from './experiencesCard/ExperiencesCard';

const Experiences = () => (
  <Section id="experience">
    <UpTitle text="Experience" icon={experienceIcon} />
    <Title>Work history</Title>
    <ul>
      {experiences.map((experience) => (
        <ExperiencesCard key={experience.period} experience={experience} />
      ))}
    </ul>
  </Section>
);

export default Experiences;
