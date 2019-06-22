import React, { createContext, useState } from 'react';

const defaultContext = {
  isProfileOpen: false,
  toggleProfileOpen: () => {
    this.isProfileOpen = !this.isProfileOpen;
  },
};

const LayoutContext = createContext(defaultContext);

export const LayoutProvider = ({ children }) => {
  const [isProfileOpen, setProfileOpen] = useState(
    defaultContext.isProfileOpen
  );

  const toggleProfileOpen = () => {
    setProfileOpen(!isProfileOpen);
  };

  return (
    <LayoutContext.Provider
      value={{
        isProfileOpen,
        toggleProfileOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContext;
