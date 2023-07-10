import Button from '../Button/Button';

import styles from './Banner.module.scss';

const Banner = () => (
  <section className={styles.Banner}>
    <div className={styles.main}>
      <h1 className="fade-in--active">Looking for a Web Developer?</h1>
      <p className={`${styles.subtitle} fade-in--active`}>
        Are you in need of a skilled web developer who can transform your ideas into captivating and
        functional web applications? Look no further! With a proven track record of delivering
        engaging and visually stunning websites, I am committed to exceeding your expectations and
        bringing your vision to life.
      </p>
      <Button
        style={{ animationDelay: '0.2s' }}
        className="fade-in--active"
        label="Contact me!"
        onClick={() => window.open('mailto:kevinsauvage@outlook.com')}
      />
    </div>
  </section>
);

export default Banner;
