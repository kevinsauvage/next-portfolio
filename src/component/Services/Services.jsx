import services from '../../data/services';
import { servicesIcon } from '../../data/svg';
import Section from '../Section/Section';
import Title from '../Title/Title';
import UpTitle from '../Uptitle/UpTitle';

import styles from './Services.module.scss';

const Services = () => (
  <Section id="services">
    <UpTitle text="Services" icon={servicesIcon} />
    <Title subtitle="Discover a diverse range of services and skills tailored to exceed your expectations and meet your unique needs.">
      What I do
    </Title>
    <ul className={styles.services}>
      {services.map((service, index) => (
        <li key={service?.title}>
          <div className={styles.card}>
            <h2 className={styles.title}>{service.title}</h2>
            <p>{service.content}</p>
          </div>
        </li>
      ))}
    </ul>
  </Section>
);

export default Services;
