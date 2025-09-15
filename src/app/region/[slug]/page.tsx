import { Container, SimpleGrid, Text, Title } from "@mantine/core";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventCard from "@/components/event-card";
import { getEvents, getTenantConfig } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const tenantConfig = await getTenantConfig();
    const region = tenantConfig?.regions?.find(
      (r) => r.slug === slug && r.enabled
    );

    if (region) {
      return {
        title: `Events in ${region.name}`,
        description: `Browse upcoming events and tickets in ${region.name}`,
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: "Region Events",
    description: "Browse events in this region",
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Get tenant config to find the region details
  const tenantConfig = await getTenantConfig();

  if (!tenantConfig?.regions) {
    throw new Error("Failed to load region configuration");
  }

  const region = tenantConfig.regions.find((r) => r.slug === slug && r.enabled);

  if (!region) {
    notFound();
  }

  // Search for events in this region using lat/long/radius
  const { events } = await getEvents({
    latitude: region.latitude,
    longitude: region.longitude,
    radius: region.radius,
    limit: 100,
  });

  return (
    <Container size="xl" mt="xl">
      <Title order={1} mb="xl">
        Events in {region.name}
      </Title>

      {events.length === 0 && (
        <Text c="dimmed">No events found in {region.name}.</Text>
      )}

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
