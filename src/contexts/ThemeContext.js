import React, { createContext, useState } from 'react';

import baseTheme, { lightTheme, darkTheme } from '../styles/BaseTheme';

const defaultContext = {
  isDark: true,
  toggleDark: () => {
    this.isDark = !this.isDark;
  },
  getTheme: () => baseTheme,
};

const ThemeContext = createContext({ dark: true });
export const ThemeProvider = ({ children }) => {
  const [isDark, setDark] = useState(defaultContext.isDark);
  const toggleDark = () => {
    setDark(!isDark);
  };

  const getTheme = () =>
    Object.assign({}, baseTheme, isDark ? darkTheme : lightTheme);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleDark,
        getTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
