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

  const closeProfile = () => {
    setProfileOpen(false);
  };

  return (
    <LayoutContext.Provider
      value={{
        isProfileOpen,
        toggleProfileOpen,
        closeProfile,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContext;
