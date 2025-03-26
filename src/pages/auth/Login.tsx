import { useAuthStore } from "@/stores/auth.store";
import {
  Anchor,
  Button,
  Center,
  Flex,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Navigate } from "react-router";
import { useLogin } from "./queries";

export default function Login() {
  const { user, login } = useAuthStore((state) => state);

  const { isPending, mutateAsync } = useLogin();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value: string) =>
        value.length > 0 ? null : "Username is required",
      password: (value: string) =>
        value.length > 0 ? null : "Password is required",
    },
  });

  const onSubmit = (values: Record<string, unknown>) => {
    mutateAsync(values).then((response) => {
      login(response.data);
      form.reset();
    });
  };

  if (user?.role === "ADMIN") return <Navigate to="/" />;

  if (user?.role === "SCANNER") return <Navigate to="/qr-scanner" />;

  return (
    <Center w="100vw" h="100vh">
      <Paper p="xl" w={340} radius="xl">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            <Flex align="baseline" justify="center">
              <Title c="primary">R</Title>
              <Title order={3} ta="center">
                eward&nbsp;
              </Title>
              <Title c="primary">S</Title>
              <Title order={3} ta="center">
                ystem
              </Title>
            </Flex>
            <TextInput
              placeholder="Username or Email"
              {...form.getInputProps("username")}
            />
            <PasswordInput
              placeholder="Password"
              {...form.getInputProps("password")}
            />
            <Flex align="center" gap={4} mb="xs">
              <Text size="xs" c="dimmed">
                Don't have an account?
              </Text>
              <Anchor size="xs" fw={500}>
                Request Now
              </Anchor>
            </Flex>
            <Button type="submit" loading={isPending}>
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}
