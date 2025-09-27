import {
  WHITE,
  INACTIVE_BG_COLOR,
  INACTIVE_BUTTON_BG_COLOR,
  INACTIVE_TEXT_COLOR,
} from "@/configs/constants";
import { Group, Button, useMantineTheme } from "@mantine/core";

interface Props {
  mode: "login" | "register";
  onModeChange: (mode: "login" | "register") => void;
}

export default function LoginRegisterControl({ mode, onModeChange }: Props) {
  const theme = useMantineTheme();

  return (
    <Group
      gap={0}
      grow
      w={{ base: "100%", sm: 400, md: 500 }} 
      p={4}
      style={{
        backgroundColor: INACTIVE_BG_COLOR,
        borderRadius: theme.radius.xl,
        boxShadow: theme.shadows.md,
      }}
    >
      <Button
        radius="xl"
        onClick={() => onModeChange("login")}
        style={{
          backgroundColor:
            mode === "login" ? WHITE : INACTIVE_BUTTON_BG_COLOR,
          color: INACTIVE_TEXT_COLOR,
        }}
      >
        Login
      </Button>

      <Button
        radius="xl"
        onClick={() => onModeChange("register")}
        style={{
          backgroundColor:
            mode === "register"
              ? WHITE
              : INACTIVE_BUTTON_BG_COLOR,
          color: INACTIVE_TEXT_COLOR,
        }}
      >
        Register
      </Button>
    </Group>
  );
}
