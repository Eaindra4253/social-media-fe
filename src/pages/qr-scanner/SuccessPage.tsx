import {
  Alert,
  Box,
  Card,
  Container,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconAlertTriangle, IconCheck } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";

export function SuccessPage() {
  const location = useLocation();
  const data = location.state;

  return (
    <Container size="sm" px="md">
      <Space h="md" />
      <Card shadow="sm" radius="md" withBorder>
        {data ? (
          <>
            {data ? (
              <>
                <Card.Section p="md" ta="center">
                  <IconCheck size={160} color="green" />
                </Card.Section>
                <Stack align="center" p="md">
                  <Title order={3} ta="center" c="green">
                    Transaction Success!
                  </Title>
                  <Text size="sm">Coupon Name: {data.couponName}</Text>
                  <Text size="sm">Discount: {data.amount} Kyats</Text>
                </Stack>
              </>
            ) : (
              <Alert
                icon={<IconAlertTriangle size={16} />}
                title="Bummer!"
                color="red"
              >
                This coupon is not valid.
              </Alert>
            )}
          </>
        ) : (
          <Box ta="center" p="md">
            <Text size="lg" c="red">
              No data received.
            </Text>
          </Box>
        )}
      </Card>
    </Container>
  );
}
