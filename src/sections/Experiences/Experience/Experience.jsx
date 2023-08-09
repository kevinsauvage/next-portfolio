import Link from 'next/link';

import Animation from '@/components/Animation/Animation';
import IconArrowUpRight from '@/svg/IconArrowUpRight';

import styles from './Experience.module.scss';

const Experience = ({ experience }) => {
  const { title, period, description, company } = experience;

  return (
    <li>
      <Animation
        duration={1000}
        delay={100}
        animationKeyframes={['slide', 'fade-in']}
        initialStyle={{ opacity: 0, transform: 'translate(0px, 100px)' }}
      >
        <Link href={company.link} target="_blank">
          <div className={styles.card}>
            <p className={styles.period}>{period}</p>
            <div>
              <div className={styles.header}>
                <p className={styles.title}>{title}</p>
                <div className={styles.company}>
                  <p>- {company.name}</p>
                  <IconArrowUpRight />
                </div>
              </div>
              <p>{description}</p>
            </div>
          </div>
        </Link>
      </Animation>
    </li>
  );
};

export default Experience;
