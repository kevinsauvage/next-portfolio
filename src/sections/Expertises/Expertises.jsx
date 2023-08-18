import InViewAnimation from '@/components/InViewAnimation/InViewAnimation';
import services from '@/config/expertises';

import styles from './Expertises.module.scss';

const Expertise = ({ service }) => (
  <InViewAnimation hidden={{ opacity: 0, y: '100px' }} visible={{ opacity: 1, y: '0px' }} tag="li">
    <div className={styles.card}>
      <p className={styles.title}>{service.title}</p>
      <p>{service.content}</p>
    </div>
  </InViewAnimation>
);

const Expertises = () => (
  <ul className={styles.Expertise}>
    {services.map((service) => (
      <Expertise service={service} key={service.title} />
    ))}
  </ul>
);

export default Expertises;
