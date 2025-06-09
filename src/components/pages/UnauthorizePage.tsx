import { Button, Stack, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export function UnauthorizedPage() {
  return (
    <Stack mih={500} align="center" justify="center">
      <Title order={3}>Unauthorized</Title>
      <p>You are not authorized to access this page</p>
      <Button leftSection={<IconArrowLeft />} component={Link} to="/">
        Go to Home
      </Button>
    </Stack>
  );
}
