import Section from '@/components/_scopes/section/Section/Section';

import styles from './Banner.module.scss';

const Banner = ({ ...rest }) => (
  <Section {...rest}>
    <div className={styles.Banner}>
      <h1 className="fade-in--active">
        Looking for a <strong>Web Developer?</strong>
      </h1>
      <p className={`${styles.subtitle} fade-in--active`}>
        Are you in need of a skilled web developer who can transform your ideas into captivating and
        functional web applications? Look no further! With a proven track record of delivering
        engaging and visually stunning websites, I am committed to exceeding your expectations and
        bringing your vision to life.
      </p>
    </div>
  </Section>
);

export default Banner;
