import { useLocation } from 'react-router-dom';
import { Container, Title, Text, Box, Stack, Card, Alert } from '@mantine/core';
import { IconAlertTriangle, IconCheck } from '@tabler/icons-react';

export function SuccessPage() {
  const location = useLocation();
  const data = location.state;

  const isValid = data?.couponType === 'DISCOUNT';

  return (
    <Container size="sm" px="md">
      <Card shadow="sm" radius="md" withBorder>
        {data ? (
          <>
            {isValid ? (
              <>
                <Card.Section p="md" ta="center">
                  <IconCheck size={160} color="green" />
                </Card.Section>
                <Stack align="center" p="md">
                  <Title order={3} ta="center" c="green">
                    Coupon Valid!
                  </Title>
                  <Text size="sm">Coupon Name: {data.couponName}</Text>
                  <Text size="sm">Discount: {data.amount} Kyats</Text>
                  <Text size="sm">Transaction ID: {data.transactionId}</Text>
                </Stack>
              </>
            ) : (
              <Alert icon={<IconAlertTriangle size={16} />} title="Bummer!" color="red">
                This coupon is not valid.
              </Alert>
            )}
          </>
        ) : (
          <Box ta="center" p="md">
            <Text size="lg" c="gray">
              No data received.
            </Text>
          </Box>
        )}
      </Card>
    </Container>
  );
}
