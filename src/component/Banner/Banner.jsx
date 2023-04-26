/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import { useRouter } from 'next/router';

import illustration from '../../images/banner.svg';
import Button from '../Button/Button';

import styles from './Banner.module.scss';

const Banner = () => {
  const { push } = useRouter();
  return (
    <section className={styles.Banner}>
      <div className={styles.main}>
        <small>
          {'< '}Greetings, I'm {'/>'}
        </small>
        <h1>Kévin Sauvage</h1>
        <h2>Expert Developer.</h2>
        <p className={styles.subtitle}>
          I specialize in creating distinctive and captivating visual experiences
          <br /> that spark imagination, convey information,
          <br /> and evoke emotion.
        </p>
        <div className={styles.button}>
          <Button label="Hire me" onClick={() => push('/#contact')} />
        </div>
      </div>
      <aside className={styles.aside}>
        <Image
          width="851"
          height="741"
          layout="responsive"
          src={illustration.src}
          alt="banner illustration of a man and a computer"
          priority
        />
      </aside>
    </section>
  );
};

export default Banner;
