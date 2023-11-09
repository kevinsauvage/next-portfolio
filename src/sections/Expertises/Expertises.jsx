import services from '@/config/expertises';

import styles from './Expertises.module.scss';

const Expertise = ({ service }) => (
  <li>
    <div className={styles.card}>
      <p className={styles.title}>{service.title}</p>
      <p>{service.content}</p>
    </div>
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
