import LinkClient from '@/components/LinkClient/LinkClient';
import experiences from '@/config/experiences';
import IconArrowRight from '@/svg/IconArrowRight';

import Experience from './Experience/Experience';

import styles from './Experiences.module.scss';

const Experiences = () => (
  <div className={styles.experiences}>
    <ul className={styles.list}>
      {experiences.map((experience) => (
        <Experience key={experience.period} experience={experience} />
      ))}
    </ul>
    <LinkClient
      href="/kevin-sauvage-cv.pdf"
      className={styles.link}
      aria-label="Download my curriculum"
      target="_blank"
      prefetch={false}
      trackInfo={{ label: 'Download my curriculum', title: 'Click download cv' }}
    >
      View Full Résumé
      <IconArrowRight />
    </LinkClient>
  </div>
);

export default Experiences;
