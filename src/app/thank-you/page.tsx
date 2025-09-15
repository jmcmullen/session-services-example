import {
  Button,
  Center,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconCalendar,
  IconCheck,
  IconDeviceMobile,
  IconMail,
  IconTicket,
} from "@tabler/icons-react";
import Link from "next/link";

export default function OrderCompletePage() {
  return (
    <Container size="sm" mt="xl">
      <Stack align="center" gap="lg">
        <Center>
          <ThemeIcon size={80} radius="xl" color="green" variant="light">
            <IconCheck size={40} />
          </ThemeIcon>
        </Center>

        <Title order={1} ta="center">
          Order Complete!
        </Title>

        <Text size="lg" c="dimmed" ta="center">
          Thank you for your purchase. Your tickets have been confirmed and you
          should receive an email confirmation shortly.
        </Text>

        <Paper p="lg" withBorder w="100%" bg="gray.0">
          <Title order={3} mb="md">
            What's Next?
          </Title>
          <Stack gap="xs">
            <Group gap="xs">
              <ThemeIcon color="blue" size={24} radius="xl">
                <IconMail size={16} />
              </ThemeIcon>
              <Text>Check your email for order confirmation and tickets</Text>
            </Group>
            <Group gap="xs">
              <ThemeIcon color="teal" size={24} radius="xl">
                <IconDeviceMobile size={16} />
              </ThemeIcon>
              <Text>Save your tickets to your mobile device</Text>
            </Group>
            <Group gap="xs">
              <ThemeIcon color="orange" size={24} radius="xl">
                <IconCalendar size={16} />
              </ThemeIcon>
              <Text>Add the event to your calendar</Text>
            </Group>
            <Group gap="xs">
              <ThemeIcon color="grape" size={24} radius="xl">
                <IconTicket size={16} />
              </ThemeIcon>
              <Text>Present your tickets at the venue entrance</Text>
            </Group>
          </Stack>
        </Paper>

        <Button component={Link} href="/" size="lg" radius="md" color="pink">
          Browse More Events
        </Button>
      </Stack>
    </Container>
  );
}
