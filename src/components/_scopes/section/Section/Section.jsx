import { useEffect } from 'react';

import { useGlobalContext } from '@/contexts/GlobalContext';
import useOnScreen from '@/hooks/useOnScreen';
import { debounce } from '@/utils';

import SectionSubtitle from '../SectionSubtitle/SectionSubtitle';
import SectionTitle from '../SectionTitle/SectionTitle';
import SectionUpTitle from '../SectionUptitle/SectionUpTitle';

import styles from './Section.module.scss';

const Section = ({ children, label, icon, title, subtitle, showSubtitle, tagLevel, style }) => {
  const { isIntersecting, reference } = useOnScreen();
  const { activeSection, updateActiveSection } = useGlobalContext();

  const debouncedUpdateActive = debounce(updateActiveSection, 200);

  useEffect(() => {
    if (isIntersecting) debouncedUpdateActive(label);
  }, [activeSection, debouncedUpdateActive, isIntersecting, label, updateActiveSection]);

  return (
    <section className={styles.Section} id={label?.split(' ')?.join('-')} style={style}>
      <header>
        {label && <SectionUpTitle icon={icon} text={label} />}
        {title && <SectionTitle title={title} tagLevel={tagLevel} />}
        {subtitle && showSubtitle && <SectionSubtitle subtitle={subtitle} />}
      </header>
      <div ref={reference} />
      {children}
    </section>
  );
};

export default Section;
