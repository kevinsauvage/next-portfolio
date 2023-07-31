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
        <p className={styles.title}>{service.title}</p>
        <p>{service.content}</p>
      </div>
    </Animation>
  </li>
);

const Expertises = () => (
  <ul className={styles.Expertise}>
    {services.map((service) => (
      <Expertise service={service} key={service.title} />
    ))}
  </ul>
);

export default Expertises;
