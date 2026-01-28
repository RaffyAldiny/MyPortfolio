"use client";

import React, { createContext, useContext, useState } from "react";

type HeaderThemeContextType = {
  headerVisible: boolean;
  setHeaderVisible: (visible: boolean) => void;
};

const HeaderThemeContext = createContext<HeaderThemeContextType>({
  headerVisible: true,
  setHeaderVisible: () => {},
});

export function HeaderThemeProvider({ children }: { children: React.ReactNode }) {
  const [headerVisible, setHeaderVisible] = useState(true);

  return (
    <HeaderThemeContext.Provider value={{ headerVisible, setHeaderVisible }}>
      {children}
    </HeaderThemeContext.Provider>
  );
}

export const useHeaderTheme = () => useContext(HeaderThemeContext);