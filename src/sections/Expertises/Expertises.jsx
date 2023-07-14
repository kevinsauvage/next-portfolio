import Section from '@/components/_scopes/section/Section/Section';
import services from '@/data/expertises';
import useOnScreen from '@/hooks/useOnScreen';

import styles from './Expertises.module.scss';

const Expertise = ({ service }) => {
  const { reference } = useOnScreen('fade-in', 'fade-in--active');

  return (
    <li key={service?.title} ref={reference}>
      <div className={styles.card}>
        <h2 className={styles.title}>{service.title}</h2>
        <p>{service.content}</p>
      </div>
    </li>
  );
};

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
