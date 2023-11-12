import Link from 'next/link';

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
    <Link
      href="/kevin-sauvage-cv.pdf"
      className={styles.link}
      aria-label="View Full Résumém"
      target="_blank"
      prefetch={false}
      rel="noopener noreferrer"
      title="View Full Résumé"
    >
      View Full Résumé
      <IconArrowRight />
    </Link>
  </div>
);

export default Experiences;
