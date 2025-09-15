"use client";

import { type MantineColorScheme, MantineProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { TenantProvider } from "@/lib/tenant-context";
import ThemeContext from "@/lib/theme-context";
import type { TenantConfig } from "@/lib/types";
import GlobalStyles from "./global-styles";

interface ThemeProviderProps {
  children: React.ReactNode;
  theme: {
    primaryColor: string;
    colors: Record<string, string[]>;
    fontFamily?: string;
    fontFamilyMonospace?: string;
  };
  tenantConfig?: TenantConfig | null;
}

export default function ThemeProvider({
  children,
  theme,
  tenantConfig,
}: ThemeProviderProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<MantineColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  useHotkeys([
    [
      "mod+J",
      () =>
        setColorScheme((current) => (current === "dark" ? "light" : "dark")),
    ],
  ]);

  const toggleColorScheme = (value?: MantineColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, onChange: toggleColorScheme }}>
      <TenantProvider config={tenantConfig || null}>
        <MantineProvider
          theme={{
            ...theme,
            colors: {
              ...theme.colors,
              dark: [
                "#d5d7e0",
                "#acaebf",
                "#8c8fa3",
                "#666980",
                "#4d4f66",
                "#34354a",
                "#2b2c3d",
                "#1d1e30",
                "#0c0d21",
                "#01010a",
              ],
            },
          }}
        >
          <GlobalStyles />
          {children}
        </MantineProvider>
      </TenantProvider>
    </ThemeContext.Provider>
  );
}
