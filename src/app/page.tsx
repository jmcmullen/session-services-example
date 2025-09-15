import { Container, SimpleGrid, Text, Title } from "@mantine/core";
import EventCard from "@/components/event-card";
import { getEvents } from "@/lib/api";

export default async function HomePage() {
  const { events } = await getEvents();

  return (
    <Container size="xl" mt="xl">
      <Title order={1} mb="xl">
        Upcoming Events
      </Title>

      {events.length === 0 && <Text c="dimmed">No events found.</Text>}

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
