import services from '../../data/services';
import { servicesIcon } from '../../data/svg';
import Section from '../Section/Section';
import Title from '../Title/Title';
import UpTitle from '../Uptitle/UpTitle';

import styles from './Services.module.scss';

const Services = () => (
  <Section id="services">
    <UpTitle text="Services" icon={servicesIcon} />
    <Title>What I offer</Title>
    <ul className={styles.services}>
      {services.map((service) => (
        <li key={service.title} className={styles.card}>
          <h2 className={styles.title}>{service.title}</h2>
          <p className={styles.content}>{service.content}</p>
        </li>
      ))}
    </ul>
  </Section>
);

export default Services;
