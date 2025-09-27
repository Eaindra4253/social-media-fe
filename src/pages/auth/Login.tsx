import AuthForm from "./Form";
import { useState } from "react";
import bg from "@/assets/bg.png";
import { useLogin, useRegister } from "./queries";
import { useAuthStore } from "@/stores/auth.store";
import LoginRegisterControl from "./LoginRegisterControl";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Center,
  Stack,
  Title,
  Text,
} from "@mantine/core";
import { WHITE } from "@/configs/constants";

export default function LoginPage() {
  const auth = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "register">("login");

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleSubmit = (
    values: Partial<AuthUser> & {
      password: string;
      password_confirmation?: string;
    }
  ) => {
    if (tab === "login") {
      loginMutation.mutateAsync(values).then(() => {
        navigate("/home");
      });
    } else {
      registerMutation.mutateAsync(values).then(() => {
        setTab("login");
        navigate("/login");
      });
    }
  };

  if (auth) return <Navigate to="/home" replace />;

  const isPending =
    tab === "login" ? loginMutation.isPending : registerMutation.isPending;

  return (
    <Box
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Container size="sm" px={{ base: "sm", md: "md" }}>
        <Center mb="md">
          <Stack align="center">
            <Title  fz={{ base: "1.5rem", sm: "1.75rem", md: "2rem" }}>
              Social
            </Title>
            <Text
              c="dimmed"
              size="sm"
              ta="center"
            >
              Connect with friends and share your moments
            </Text>
          </Stack>
        </Center>

        <Center mb="md">
          <LoginRegisterControl mode={tab} onModeChange={setTab} />
        </Center>

        <Paper
          shadow="xl"
          radius="md"
          p={{ base: "sm", md: "md" }}
          withBorder
          bg="primary.10"
          w="100%"
          maw={500}
          mx="auto"
        >
          <AuthForm
            mode={tab}
            isSubmitting={isPending}
            onSubmit={handleSubmit}
          />
        </Paper>

        <Center mt="md">
          <Paper
            shadow="sm"
            radius="md"
            p={{ base: "sm", md: "md" }}
            w="100%"
            maw={500}
            withBorder
            bg="primary.10"
            mx="auto"
          >
            <Stack gap="xs" align="center">
              <Text size="sm" c={WHITE} ta="center">
                Demo account for testing:
              </Text>
              <Text size="sm" c={WHITE} ta="center">
                Email: demo@example.com , Password: demo123
              </Text>
            </Stack>
          </Paper>
        </Center>
      </Container>
    </Box>
  );
}
