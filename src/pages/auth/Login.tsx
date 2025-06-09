import Logo from "@/assets/icon.png";
import { useAuthStore } from "@/stores/auth.store";
import {
  Button,
  Center,
  Flex,
  Image,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useLogin } from "./queries";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { user, login } = useAuthStore((state) => state);
  const theme = useMantineTheme();

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

  if (user) return <Navigate to="/" />;

  return (
    <Center w="100vw" h="100vh" bg="gray.0">
      <Stack gap="xs" align="center">
        <Image src={Logo} alt="CTZPay Logo" w={80} h={80} mx="auto" />
        <Flex align="baseline" justify="center">
          <Title c="primary">R</Title>
          <Title order={4} ta="center">
            eward&nbsp;
          </Title>
          <Title c="primary">S</Title>
          <Title order={4} ta="center">
            ystem
          </Title>
        </Flex>

        <Paper p="xl" w={340} radius="md" shadow="md">
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack gap="md">
              <Title order={4} ta="left" c="primary">
                Log in
              </Title>

              <TextInput
                label="Email or mobile number"
                placeholder="Please enter username"
                {...form.getInputProps("username")}
              />

              <PasswordInput
                label="Password"
                placeholder="Please enter PIN"
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? (
                    <IconEye color={theme.colors.primary[6]} />
                  ) : (
                    <IconEyeOff color={theme.colors.primary[6]} />
                  )
                }
                {...form.getInputProps("password")}
              />

              <Button type="submit" fullWidth loading={isPending} mt={10}>
                Log in
              </Button>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Center>
  );
}
