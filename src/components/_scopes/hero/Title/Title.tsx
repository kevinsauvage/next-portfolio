'use client';

import AnimatedContainer from '@/components/AnimatedContainer/AnimatedContainer';

import styles from './Title.module.scss';

const renderLetters = (text: string) =>
  text.split('', 100).map((char, index) => (
    <span
      key={index}
      className="char"
      style={{
        display: 'inline-block',
        opacity: 0,
        willChange: 'transform, opacity',
      }}
    >
      {char}
    </span>
  ));

const Title: React.FC = () => {
  return (
    <AnimatedContainer
      Tag="h1"
      className={styles.Title}
      from={{ ease: 'sine.out', opacity: 0, y: 250 }}
      to={{
        duration: 0.5,
        ease: 'sine.out',
        opacity: 1,
        stagger: {
          amount: 0.5,
          each: 0.1,
        },
        y: 0,
      }}
      triggerClassName=".char"
    >
      <span className={styles.first}>{renderLetters("Hello, I'm")}</span>
      <span className={styles.second}>{renderLetters('Kevin Sauvage')}</span>
    </AnimatedContainer>
  );
};

export default Title;
