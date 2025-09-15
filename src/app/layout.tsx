import { ColorSchemeScript } from "@mantine/core";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@mantine/core/styles.css";
import Layout from "@/components/layout";
import ThemeProvider from "@/components/theme-provider";
import { getTenantConfig } from "@/lib/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Session Services Example - Event Ticketing Platform",
  description: "Discover and purchase tickets for upcoming events",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let tenantConfig = null;

  try {
    tenantConfig = await getTenantConfig();
  } catch (error) {
    // Continue with default values if tenant config fails
    console.error("Failed to fetch tenant config:", error);
  }

  const theme = {
    primaryColor: "pink",
    colors: {
      pink: [
        "#ffe5f1",
        "#ffb3d4",
        "#fc80b8",
        "#f84d9b",
        "#f41b7f",
        "#db0265",
        "#aa004e",
        "#790038",
        "#490021",
        "#1b000b",
      ],
    },
    fontFamily: geistSans.style.fontFamily,
    fontFamilyMonospace: geistMono.style.fontFamily,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ThemeProvider theme={theme} tenantConfig={tenantConfig}>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
