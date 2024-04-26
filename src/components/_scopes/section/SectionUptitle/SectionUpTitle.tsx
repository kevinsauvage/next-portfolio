import { cloneElement, JSXElementConstructor, ReactElement } from 'react';

import styles from './SectionUpTitle.module.scss';

type Properties = {
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  id?: string;
};

const SectionUpTitle = ({ text, icon, id }: Properties) => (
  <div className={styles.uptitle} id={id}>
    {cloneElement(icon, { role: 'presentation', size: 20, strokeWidth: 1.5 })}
    <p>{text}</p>
  </div>
);

export default SectionUpTitle;
