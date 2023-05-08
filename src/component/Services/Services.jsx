import services from '../../data/services';
import { servicesIcon } from '../../data/svg';
import FadeIn from '../FadeIn/FadeIn';
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
          <FadeIn delay={`${0.3 * index}s`} className={styles.card}>
            <h2 className={styles.title}>{service.title}</h2>
            <p className={styles.content}>{service.content}</p>
          </FadeIn>
        </li>
      ))}
    </ul>
  </Section>
);

export default Services;
