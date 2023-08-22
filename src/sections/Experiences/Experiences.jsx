import Link from 'next/link';

import experiences from '@/config/experiences';
import IconArrowUpRight from '@/svg/IconArrowUpRight';

import Experience from './Experience/Experience';

import styles from './Experiences.module.scss';

const Experiences = () => (
  <div className={styles.experiences}>
    <ul className={styles.list}>
      {experiences.map((experience) => (
        <Experience key={experience.period} experience={experience} />
      ))}
    </ul>
    <Link
      href="/kevin-sauvage-cv.pdf"
      className={styles.link}
      aria-label="Download my curriculum"
      target="_blank"
      prefetch={false}
    >
      View Full Résumé
      <IconArrowUpRight />
    </Link>
  </div>
);

export default Experiences;
