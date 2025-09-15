"use client";

import {
  Badge,
  Card,
  Group,
  Image,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconCalendar, IconMapPin } from "@tabler/icons-react";
import Link from "next/link";
import { useTheme } from "@/lib/theme-context";
import type { Event } from "@/lib/types";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useTheme();
  const isDark = colorScheme === "dark";

  return (
    <Card
      shadow="sm"
      padding={0}
      radius="md"
      withBorder
      component={Link}
      href={`/events/${event.slug || event.id}`}
      style={{
        cursor: "pointer",
        textDecoration: "none",
        backgroundColor: isDark ? theme.colors.dark[6] : theme.white,
        borderColor: isDark ? theme.colors.dark[4] : theme.colors.gray[3],
        color: isDark ? theme.colors.dark[0] : theme.black,
      }}
    >
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%", // 16:9 aspect ratio
          overflow: "hidden",
          borderRadius: "var(--mantine-radius-md) var(--mantine-radius-md) 0 0",
        }}
      >
        {event.images?.desktop ? (
          <Image
            src={event.images.desktop.src}
            alt={event.images.desktop.alt}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(45deg, #FFB3C1, #FF6B9D)",
            }}
          />
        )}
      </div>

      <Stack gap="xs" p="md">
        <Text fw={600} size="lg" c={isDark ? "white" : "dark"}>
          {event.name}
        </Text>

        {event.entryStartsAt && (
          <Group gap="xs">
            <IconCalendar size={16} stroke={1.5} />
            <Text size="sm" c="dimmed">
              {new Date(event.entryStartsAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </Text>
          </Group>
        )}

        {event.location && (
          <Group gap="xs">
            <IconMapPin size={16} stroke={1.5} />
            <Text size="sm" c="dimmed">
              {event.location.name}
              {event.location.city && `, ${event.location.city}`}
            </Text>
          </Group>
        )}

        {event.description && (
          <Text size="sm" lineClamp={3} c={isDark ? "gray.3" : "gray.7"}>
            {event.description}
          </Text>
        )}

        {event.status && (
          <Group gap="xs" mt="xs">
            <Badge
              color={
                event.status === "ACTIVE"
                  ? "green"
                  : event.status === "UPCOMING"
                    ? "blue"
                    : event.status === "ENDED"
                      ? "gray"
                      : "red"
              }
              variant="light"
            >
              {event.status}
            </Badge>
            {event.visibility && event.visibility !== "PUBLIC" && (
              <Badge color="yellow" variant="light">
                {event.visibility}
              </Badge>
            )}
          </Group>
        )}
      </Stack>
    </Card>
  );
}
