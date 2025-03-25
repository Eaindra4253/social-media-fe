import {
  Alert,
  Box,
  Card,
  Container,
  Space,
  Stack,
  Text,
  Title,
  Button,
} from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";

export function ScanErrorPage() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  return (
    <Container size="sm" px="md">
      <Space h="md" />
      <Card shadow="sm" radius="md" withBorder>
        {data ? (
          <>
            {data ? (
              <>
                <Card.Section p="md" ta="center">
                  <IconAlertTriangle size={160} color="red" />
                </Card.Section>
                <Stack align="center" p="md">
                  <Title order={3} ta="center" c="red">
                    {data}
                  </Title>
                </Stack>
              </>
            ) : (
              <Alert
                icon={<IconAlertTriangle size={16} />}
                title="Bummer!"
                color="red"
              >
                Transaction Failed!
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
      <Space h="md" />
      <Button fullWidth onClick={() => navigate(-1)}>
        Scan Again
      </Button>
    </Container>
  );
}
