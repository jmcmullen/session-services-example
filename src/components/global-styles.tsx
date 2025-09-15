"use client";

import { useMantineTheme } from "@mantine/core";
import { useEffect } from "react";
import { useTheme } from "@/lib/theme-context";

export default function GlobalStyles() {
  const theme = useMantineTheme();
  const { colorScheme } = useTheme();

  useEffect(() => {
    const isDark = colorScheme === "dark";
    document.body.style.backgroundColor = isDark
      ? theme.colors.dark[7]
      : theme.white;
    document.body.style.color = isDark ? theme.colors.dark[0] : theme.black;
    document.body.style.transition =
      "background-color 100ms ease, color 100ms ease";
  }, [colorScheme, theme.colors.dark, theme.white, theme.black]);

  return null;
}
