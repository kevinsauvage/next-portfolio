import { useEffect, useState } from 'react';

import IconMoonOutline from '@/svg/IconMoonOutline';
import IconSun from '@/svg/IconSun';

import styles from './ThemeSwitcher.module.scss';

const THEME_LIGHT = 'theme-light';

const ThemeSwitcher = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const setLightTheme = () => {
    const htmlElement = document.querySelector('html');
    htmlElement.classList.add(THEME_LIGHT);
    setIsDarkTheme(false);
  };

  const setDarkTheme = () => {
    const htmlElement = document.querySelector('html');
    htmlElement.classList.remove(THEME_LIGHT);
    setIsDarkTheme(true);
  };

  useEffect(() => {
    const htmlElement = document.querySelector('html');

    if (htmlElement.classList.contains(THEME_LIGHT)) {
      setLightTheme();
    }
  }, []);

  return (
    <button
      type="button"
      onClick={() => (isDarkTheme ? setLightTheme() : setDarkTheme())}
      className={styles.button}
    >
      {isDarkTheme ? <IconSun /> : <IconMoonOutline />}
    </button>
  );
};

export default ThemeSwitcher;
