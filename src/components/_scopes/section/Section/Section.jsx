import { useEffect } from 'react';

import { useGlobalContext } from '@/contexts/GlobalContext';
import useOnScreen from '@/hooks/useOnScreen';

import SectionSubtitle from '../SectionSubtitle/SectionSubtitle';
import SectionTitle from '../SectionTitle/SectionTitle';
import SectionUpTitle from '../SectionUptitle/SectionUpTitle';

import styles from './Section.module.scss';

const Section = ({ children, label, icon, title, subtitle, showSubtitle, tagLevel, style }) => {
  const { isIntersecting, reference } = useOnScreen({
    rootMargin: '0px',
    threshold: 0.7,
  });

  const { updateActiveSection } = useGlobalContext();

  useEffect(() => {
    if (isIntersecting) {
      updateActiveSection(label);
    }
  }, [isIntersecting, label, updateActiveSection]);

  return (
    <section
      className={styles.Section}
      id={label?.split(' ')?.join('-')}
      style={style}
      ref={reference}
    >
      <header>
        {label && <SectionUpTitle icon={icon} text={label} />}
        {title && <SectionTitle title={title} tagLevel={tagLevel} />}
        {subtitle && showSubtitle && <SectionSubtitle subtitle={subtitle} />}
      </header>
      {children}
    </section>
  );
};

export default Section;
