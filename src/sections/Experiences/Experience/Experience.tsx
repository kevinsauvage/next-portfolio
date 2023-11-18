import { FiExternalLink } from 'react-icons/fi';

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
  };
};

const Experience = ({ experience }: Properties) => {
  const { title, period, description, company } = experience;

  return (
    <li>
      <Link
        href={company.link}
        target="_blank"
        rel="noopener noreferrer"
        title={`Go to ${company.name} website`}
      >
        <div className={styles.card}>
          <p className={styles.period}>{period}</p>
          <div className={styles.right}>
            <p className={styles.title}>{title}</p>
            <div className={styles.company}>
              <p>{company.name}</p>
              <FiExternalLink />
            </div>
            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Experience;
