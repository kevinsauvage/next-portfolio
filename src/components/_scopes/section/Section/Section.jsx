import { useEffect } from 'react';

import { useGlobalContext } from '@/contexts/GlobalContext';
import useOnScreen from '@/hooks/useOnScreen';

import SectionSubtitle from '../SectionSubtitle/SectionSubtitle';
import SectionTitle from '../SectionTitle/SectionTitle';
import SectionUpTitle from '../SectionUptitle/SectionUpTitle';

import styles from './Section.module.scss';

const Section = ({ children, label, icon, title, subtitle, showSubtitle }) => {
  const { isIntersecting, reference } = useOnScreen('', '');
  const { activeSection, updateActiveSection } = useGlobalContext();

  useEffect(() => {
    if (isIntersecting) updateActiveSection(label);
  }, [activeSection, isIntersecting, label, updateActiveSection]);

  return (
    <section className={styles.Section}>
      <div className={styles.anchor} id={label?.split(' ')?.join('-')} />
      <div ref={reference} />
      <header>
        {label && <SectionUpTitle icon={icon} text={label} />}
        {title && <SectionTitle title={title} />}
        {subtitle && showSubtitle && <SectionSubtitle subtitle={subtitle} />}
      </header>
      {children}
    </section>
  );
};

export default Section;
