import Section from '@/components/_scopes/section/Section/Section';
import Animation from '@/components/Animation/Animation';
import services from '@/data/expertises';

import styles from './Expertises.module.scss';

const Expertise = ({ service, index }) => (
  <li>
    <Animation
      duration={400}
      delay={0}
      iterationCount="1"
      timingFunction="ease-in-out"
      fillMode="forwards"
      animationKeyframes={['slide', 'fadeIn']}
      initialStyle={{ opacity: 0, transform: `translate(${index * 300}px, ${index * 300}px)` }}
    >
      <div className={styles.card}>
        <h2 className={styles.title}>{service.title}</h2>
        <p>{service.content}</p>
      </div>
    </Animation>
  </li>
);

const Expertises = ({ ...rest }) => (
  <Section {...rest}>
    <ul className={styles.Expertise}>
      {services.map((service, index) => (
        <Expertise service={service} key={service.title} index={index} />
      ))}
    </ul>
  </Section>
);

export default Expertises;
