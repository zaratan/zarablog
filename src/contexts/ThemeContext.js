import React, { createContext, useState, useEffect, useCallback } from 'react';

import baseTheme, { lightTheme, darkTheme } from '../styles/BaseTheme';

export const defaultTheme = Object.assign({}, baseTheme, darkTheme);
const defaultContext = {
  isDark: true,
  toggleDark: () => {
    this.isDark = !this.isDark;
  },
  theme: defaultTheme,
};

const ThemeContext = createContext({ dark: true });

const getTheme = (setTheme, isDark) =>
  setTheme(Object.assign({}, baseTheme, isDark ? darkTheme : lightTheme));

export const ThemeProvider = ({ children }) => {
  const [isDark, setDark] = useState(defaultContext.isDark);
  const [theme, setTheme] = useState({});

  const toggleDark = () => {
    const nextDark = !isDark;
    console.log({ nextDark, isDark });
    localStorage.setItem('ThemeContext:isDark', JSON.stringify(nextDark));
    setDark(nextDark);
    getTheme(setTheme, nextDark);
  };

  useEffect(() => {
    const lsDark = JSON.parse(localStorage.getItem('ThemeContext:isDark'));
    if (lsDark) {
      setDark(lsDark);
      getTheme(setTheme, lsDark);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleDark,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
