import services from '../../data/services';
import { servicesIcon } from '../../data/svg';
import useOnScreen from '../../hooks/useOnScreen';
import Section from '../Section/Section';

import styles from './Services.module.scss';

const ServiceItem = ({ service }) => {
  const reference = useOnScreen('fade-in', 'fade-in--active');

  return (
    <li key={service?.title} ref={reference}>
      <div className={styles.card}>
        <h2 className={styles.title}>{service.title}</h2>
        <p>{service.content}</p>
      </div>
    </li>
  );
};

const Services = () => (
  <Section
    id="services"
    icon={servicesIcon}
    title="What I do"
    subtitle="Discover a diverse range of services and skills tailored to exceed your expectations and meet your unique needs."
  >
    <ul className={styles.services}>
      {services.map((service) => (
        <ServiceItem service={service} key={service.title} />
      ))}
    </ul>
  </Section>
);

export default Services;
