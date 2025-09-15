"use client";

import { AppShell } from "@mantine/core";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <Header />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
