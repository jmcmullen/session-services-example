"use client";

import type { MantineColorScheme } from "@mantine/core";
import { createContext, useContext } from "react";

interface ThemeContextValue {
  colorScheme: MantineColorScheme;
  onChange: (colorScheme: MantineColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export default ThemeContext;
