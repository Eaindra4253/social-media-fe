import { Button, PasswordInput, TextInput, Stack, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { loginSchema, registerSchema } from "@/configs/schema";
import { BLACK } from "@/configs/constants";

interface Props {
  mode: "login" | "register";
  isSubmitting?: boolean;
  onSubmit: (values: any) => void;
}

export default function AuthForm({ mode, isSubmitting, onSubmit }: Props) {
  const isRegisterMode = mode === "register";

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
      profile_picture_url: "",
    },
    validate: isRegisterMode
      ? zodResolver(registerSchema)
      : zodResolver(loginSchema),
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap="sm">
        <Stack gap={2}>
          <Text size="md">
            {isRegisterMode ? "Create account" : "Welcome Back"}
          </Text>
          <Text c="dimmed" size="sm">
            {isRegisterMode
              ? "Join our community and start sharing"
              : "Enter your credentials to access your account"}
          </Text>
        </Stack>

        {isRegisterMode && (
          <TextInput
            label="Username"
            placeholder="Your username"
            {...form.getInputProps("name")}
            radius="md"
            w="100%"
          />
        )}

        <TextInput
          label={isRegisterMode ? "Email" : "Email or Username"}
          placeholder="you@example.com"
          {...form.getInputProps("email")}
          radius="md"
          w="100%"
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          {...form.getInputProps("password")}
          radius="md"
          w="100%"
        />

        {isRegisterMode && (
          <>
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              {...form.getInputProps("password_confirmation")}
              radius="md"
              w="100%"
            />
            <TextInput
              label="Profile Picture URL (optional)"
              placeholder="https://example.com/photo.jpg"
              {...form.getInputProps("profile_picture_url")}
              radius="md"
              w="100%"
            />
          </>
        )}

        <Button
          fullWidth
          mt="sm"
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          color={BLACK}
          radius="md"
        >
          {isRegisterMode ? "Create account" : "Sign In"}
        </Button>
      </Stack>
    </form>
  );
}
