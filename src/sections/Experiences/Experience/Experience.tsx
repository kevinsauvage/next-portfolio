import Link from 'next/link';

import styles from './Experience.module.scss';

type Properties = {
  experience: {
    title: string;
    period: string;
    description: string;
    company: {
      name: string;
      link: string;
    };
    listItem: Array<string>;
  };
};

const Experience = ({ experience }: Properties) => {
  const { title, period, company, listItem } = experience;

  return (
    <li className={styles.card} role="tabpanel">
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        <Link
          href={company.link}
          target="_blank"
          rel="noopener noreferrer"
          title={`Go to ${company.name} website`}
        >
          <div className={styles.company}>
            <p>@ {company.name}</p>
          </div>
        </Link>
      </div>
      <p className={styles.period}>{period}</p>
      <ul className={styles.list}>
        {listItem.map((item) => (
          <li key={item} className={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default Experience;
