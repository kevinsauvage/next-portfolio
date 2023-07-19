import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const ThemeContext = createContext();

const THEME_LIGHT = 'theme-light';

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const setLightTheme = () => {
    const htmlElement = document.querySelector('html');
    htmlElement.classList.add(THEME_LIGHT);
    setIsDarkTheme(false);
    localStorage.setItem('isDarkTheme', false);
  };

  const setDarkTheme = () => {
    const htmlElement = document.querySelector('html');
    htmlElement.classList.remove(THEME_LIGHT);
    setIsDarkTheme(true);
    localStorage.setItem('isDarkTheme', true);
  };

  useEffect(() => {
    const themeDark = localStorage.getItem('isDarkTheme');
    if (!themeDark) return;
    if (themeDark !== 'true') setLightTheme();
  }, []);

  const state = useMemo(
    () => ({
      isDarkTheme,
      setDarkTheme,
      setLightTheme,
    }),
    [isDarkTheme]
  );

  // Return the provider with the state values
  return <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }

  return { ...context };
};
