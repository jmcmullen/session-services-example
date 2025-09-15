import { Button, Container, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function RegionNotFound() {
  return (
    <Container size="sm" mt="xl" ta="center">
      <Title order={1} mb="md">
        Region Not Found
      </Title>
      <Text c="dimmed" mb="xl">
        The region you're looking for doesn't exist or has been disabled.
      </Text>
      <Button component={Link} href="/" size="lg">
        View All Events
      </Button>
    </Container>
  );
}
