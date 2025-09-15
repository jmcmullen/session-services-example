import { Container, Group, Image, Stack, Text, Title } from "@mantine/core";
import { IconCalendar, IconMapPin } from "@tabler/icons-react";
import { notFound } from "next/navigation";
import { TicketingSection } from "@/components/ticket-widget";
import { getEvent } from "@/lib/api";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event) {
    return notFound();
  }

  return (
    <Container size="xl" mt="xl">
      <Stack gap="lg">
        {event.images?.desktop ? (
          <Image
            src={event.images.desktop.src}
            alt={event.images.desktop.alt}
            radius="md"
            h={400}
            fit="cover"
          />
        ) : (
          <div
            style={{
              height: 400,
              borderRadius: "var(--mantine-radius-md)",
              background: "linear-gradient(45deg, #FFB3C1, #FF6B9D)",
            }}
          />
        )}

        <Group align="flex-start" gap="xl">
          <Stack style={{ flex: 1 }} gap="lg">
            <Title order={1}>{event.name}</Title>

            <Stack gap="xs">
              <Group gap="xs">
                <IconCalendar size={20} stroke={1.5} />
                <Text>
                  {new Date(event.entryStartsAt).toLocaleDateString("en-AU", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </Text>
              </Group>

              <Group gap="xs">
                <IconMapPin size={20} stroke={1.5} />
                <Text>{event.location?.name}</Text>
              </Group>
            </Stack>

            <Text style={{ whiteSpace: "pre-wrap" }}>{event.description}</Text>
          </Stack>

          <div style={{ maxWidth: 400, width: "100%" }}>
            <TicketingSection eventId={event.id} />
          </div>
        </Group>
      </Stack>
    </Container>
  );
}
