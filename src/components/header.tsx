"use client";

import {
  ActionIcon,
  Anchor,
  AppShell,
  Button,
  Container,
  Group,
  Image,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import Link from "next/link";
import { useTenant } from "@/lib/tenant-context";
import { useTheme } from "@/lib/theme-context";

export default function MantineHeader() {
  const { colorScheme, onChange } = useTheme();
  const tenantConfig = useTenant();
  const theme = useMantineTheme();

  const headerStyles = {
    backgroundColor:
      colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    borderBottom: `1px solid ${
      colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  };

  const buttonStyles = {
    root: {
      color:
        colorScheme === "dark" ? theme.colors.gray[3] : theme.colors.gray[7],
      "&:hover": {
        backgroundColor:
          colorScheme === "dark"
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(0, 0, 0, 0.05)",
      },
    },
  };

  return (
    <AppShell.Header style={headerStyles}>
      <Container size="xl" h="100%">
        <Group h="100%" align="center" justify="space-between">
          <Anchor component={Link} href="/" underline="never">
            {tenantConfig?.tenant?.logo ? (
              <Image
                src={tenantConfig.tenant.logo.website?.src}
                alt={tenantConfig.tenant.name}
                h={40}
                fit="contain"
              />
            ) : (
              <Title order={3}>{tenantConfig?.tenant?.name}</Title>
            )}
          </Anchor>

          <Group gap="md">
            <Button
              component={Link}
              href="/"
              variant="transparent"
              size="sm"
              styles={buttonStyles}
            >
              All Events
            </Button>

            {tenantConfig?.regions
              ?.filter((r) => r.enabled)
              .map((region) => (
                <Button
                  key={region.id}
                  component={Link}
                  href={`/region/${region.slug}`}
                  variant="transparent"
                  size="sm"
                  styles={buttonStyles}
                >
                  {region.name}
                </Button>
              ))}

            <ActionIcon
              variant="transparent"
              size="lg"
              radius="md"
              onClick={() =>
                onChange(
                  colorScheme === "dark"
                    ? "light"
                    : colorScheme === "light"
                      ? "dark"
                      : "light",
                )
              }
              aria-label="Toggle color scheme"
            >
              {colorScheme === "dark" ? <IconSun /> : <IconMoon />}
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </AppShell.Header>
  );
}
