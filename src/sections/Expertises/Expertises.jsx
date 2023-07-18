import Section from '@/components/_scopes/section/Section/Section';
import Animation from '@/components/Animation/Animation';
import services from '@/config/expertises';

import styles from './Expertises.module.scss';

const Expertise = ({ service }) => (
  <li>
    <Animation
      duration={400}
      delay={0}
      iterationCount="1"
      timingFunction="ease-in-out"
      fillMode="forwards"
      animationKeyframes={['slide', 'fade-in']}
      initialStyle={{ opacity: 0, transform: `translate(100%, 0px) scale(0)` }}
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
      {services.map((service) => (
        <Expertise service={service} key={service.title} />
      ))}
    </ul>
  </Section>
);

export default Expertises;
