import InViewAnimation from '@/components/InViewAnimation/InViewAnimation';
import LinkClient from '@/components/LinkClient/LinkClient';
import IconArrowUpRight from '@/svg/IconArrowUpRight';

import styles from './Experience.module.scss';

const Experience = ({ experience }) => {
  const { title, period, description, company } = experience;

  return (
    <li>
      <LinkClient
        href={company.link}
        target="_blank"
        trackInfo={{ label: title, title: 'Click experience' }}
      >
        <InViewAnimation
          hidden={{ opacity: 0, y: '100px' }}
          visible={{ opacity: 1, y: '0px' }}
          tag="div"
          className={styles.card}
        >
          <p className={styles.period}>{period}</p>
          <div>
            <div className={styles.header}>
              <p className={styles.title}>{title}</p>
              <div className={styles.company}>
                <p>- {company.name}</p>
                <IconArrowUpRight />
              </div>
            </div>
            <p className={styles.description}>{description}</p>
          </div>
        </InViewAnimation>
      </LinkClient>
    </li>
  );
};

export default Experience;
