'use client';

import { TypeAnimation } from 'react-type-animation';

import styles from './Title.module.scss';

const Title: React.FC = () => {
  return (
    <h1 className={styles.Title}>
      <span className={styles.first}>Hello, I&apos;m</span>
      <TypeAnimation
        className={styles.typeAnimation}
        sequence={[
          'Kevin Sauvage',
          3000,
          'A Web Developer',
          3000,
          'A Coder',
          3000,
          'A Problem Solver',
          3000,
          'A Passionate',
          3000,
          'A Team Player',
          3000,
        ]}
        wrapper="span"
        cursor={true}
        speed={30}
        repeat={Number.POSITIVE_INFINITY}
      />
    </h1>
  );
};

export default Title;
