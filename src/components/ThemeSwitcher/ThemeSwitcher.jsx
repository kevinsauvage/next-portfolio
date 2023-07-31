import { useThemeContext } from '@/contexts/ThemeContext';
import IconMoonOutline from '@/svg/IconMoonOutline';
import IconSun from '@/svg/IconSun';

import styles from './ThemeSwitcher.module.scss';

const ThemeSwitcher = ({ className = '' }) => {
  const { setDarkTheme, setLightTheme, isDarkTheme } = useThemeContext();

  return (
    <button
      type="button"
      aria-label={`Switch theme to ${isDarkTheme ? 'light' : 'dark'}`}
      onClick={() => (isDarkTheme ? setLightTheme() : setDarkTheme())}
      className={`${styles.button} ${className}`}
    >
      {isDarkTheme ? <IconSun /> : <IconMoonOutline />}
    </button>
  );
};

export default ThemeSwitcher;
