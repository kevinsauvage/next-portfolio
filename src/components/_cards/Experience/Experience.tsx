import Link from 'next/link';

import { ExperienceType } from './types';

import styles from './Experience.module.scss';

type Properties = {
  experience: ExperienceType;
};

const Experience = ({ experience }: Properties) => {
  const { title, period, company, listItem } = experience;

  return (
    <div className={styles.card} role="tabpanel">
      <div className={styles.header}>
        <h3 className={styles.title}>
          {title}
          <Link
            className={styles.company}
            href={company.link}
            target="_blank"
            rel="noopener noreferrer"
            title={`Go to ${company.name} website`}
          >
            @ {company.name}
          </Link>
        </h3>
      </div>
      <p className={styles.period}>{period}</p>
      <ul className={styles.list}>
        {listItem.map((item) => (
          <li key={item} className={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Experience;
