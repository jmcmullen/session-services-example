"use client";

import { useMantineTheme } from "@mantine/core";
import { SessionsTicketing } from "@session-services/react-elements";
import { useTheme } from "@/lib/theme-context";

// Custom CSS properties type for theme variables
type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

/**
 * Maps Mantine theme colors to Sessions ticketing widget CSS variables
 * Only includes variables actively used by the Sessions Ticketing component
 */
function varsForTheme(
  theme: ReturnType<typeof useMantineTheme>,
  scheme: "light" | "dark"
): CSSVars {
  if (scheme === "dark") {
    return {
      // Core surface and text
      "--background": "transparent",
      "--foreground": theme.colors.dark[0],
      "--card": theme.colors.dark[6],
      "--card-foreground": theme.colors.dark[0],

      // Actions (buttons and accents)
      "--primary": theme.colors.pink[2],
      "--primary-foreground": theme.colors.dark[9],
      "--secondary": theme.colors.dark[5],
      "--secondary-foreground": theme.colors.dark[0],
      "--accent": theme.colors.dark[4],
      "--accent-foreground": theme.colors.dark[0],

      // Muted and descriptive text
      "--muted": theme.colors.dark[5],
      "--muted-foreground": theme.colors.dark[1],

      // Feedback and borders
      "--destructive": theme.colors.red[5],
      "--border": theme.colors.dark[5],

      // Focus
      "--ring": theme.colors.pink[2],

      // Layout and shape
      "--radius": theme.radius.md,
      "--spacing-xs": theme.spacing.xs,
      "--spacing-sm": theme.spacing.sm,
      "--spacing-md": theme.spacing.md,
      "--spacing-lg": theme.spacing.lg,
      "--spacing-xl": theme.spacing.xl,

      // Typography
      "--font-family": theme.fontFamily,
      "--font-size-xs": theme.fontSizes.xs,
      "--font-size-sm": theme.fontSizes.sm,
      "--font-size-base": theme.fontSizes.md,
      "--font-size-lg": theme.fontSizes.lg,
      "--font-size-xl": theme.fontSizes.xl,
      "--font-size-2xl": "1.875rem",
      "--font-weight-normal": "400",
      "--font-weight-medium": "500",
      "--font-weight-semibold": "600",
      "--font-weight-bold": "700",

      // Shadows and transitions
      "--shadow-sm": theme.shadows.xs,
      "--shadow-base": theme.shadows.sm,
      "--shadow-md": theme.shadows.md,
      "--shadow-lg": theme.shadows.lg,
      "--shadow-xl": theme.shadows.xl,
      "--transition-fast": "150ms",
      "--transition-base": "200ms",
      "--transition-slow": "300ms",
    };
  }

  // Light theme
  return {
    // Core surface and text
    "--background": "transparent",
    "--foreground": theme.colors.gray[9],
    "--card": "#ffffff",
    "--card-foreground": theme.colors.gray[9],

    // Actions (buttons and accents)
    "--primary": theme.colors.pink[3],
    "--primary-foreground": "#ffffff",
    "--secondary": theme.colors.gray[0],
    "--secondary-foreground": theme.colors.gray[8],
    "--accent": theme.colors.gray[1],
    "--accent-foreground": theme.colors.gray[7],

    // Muted and descriptive text
    "--muted": theme.colors.gray[1],
    "--muted-foreground": theme.colors.gray[6],

    // Feedback and borders
    "--destructive": theme.colors.red[6],
    "--border": theme.colors.gray[3],

    // Focus
    "--ring": theme.colors.pink[5],

    // Layout and shape
    "--radius": theme.radius.md,
    "--spacing-xs": theme.spacing.xs,
    "--spacing-sm": theme.spacing.sm,
    "--spacing-md": theme.spacing.md,
    "--spacing-lg": theme.spacing.lg,
    "--spacing-xl": theme.spacing.xl,

    // Typography
    "--font-family": theme.fontFamily,
    "--font-size-xs": theme.fontSizes.xs,
    "--font-size-sm": theme.fontSizes.sm,
    "--font-size-base": theme.fontSizes.md,
    "--font-size-lg": theme.fontSizes.lg,
    "--font-size-xl": theme.fontSizes.xl,
    "--font-size-2xl": "1.875rem",
    "--font-weight-normal": "400",
    "--font-weight-medium": "500",
    "--font-weight-semibold": "600",
    "--font-weight-bold": "700",

    // Shadows and transitions
    "--shadow-sm": theme.shadows.xs,
    "--shadow-base": theme.shadows.sm,
    "--shadow-md": theme.shadows.md,
    "--shadow-lg": theme.shadows.lg,
    "--shadow-xl": theme.shadows.xl,
    "--transition-fast": "150ms",
    "--transition-base": "200ms",
    "--transition-slow": "300ms",
  };
}

/**
 * Renders the Sessions ticketing widget for an event
 * This component integrates the Sessions React Elements library
 * and handles theme synchronization with the app's color scheme
 */
export function TicketingSection({ eventId }: { eventId: string }) {
  const { colorScheme } = useTheme();
  const theme = useMantineTheme();

  // Convert "auto" to actual theme value for Sessions widget
  const resolvedScheme = colorScheme === "auto" ? "system" : colorScheme;
  const themeForVars = colorScheme === "auto" ? "light" : colorScheme;

  // Generate CSS variables for the widget based on current theme
  const style = varsForTheme(theme, themeForVars);

  return (
    <SessionsTicketing
      eventId={eventId}
      apiUrl={process.env.NEXT_PUBLIC_API_URL}
      tenantId={process.env.NEXT_PUBLIC_TENANT_ID}
      returnUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/thank-you`}
      theme={resolvedScheme}
      style={style}
    />
  );
}
