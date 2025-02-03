import { ThemeButton } from "@/components/ThemeButton";
import { AppShell, Box, Burger, Flex, Group } from "@mantine/core";
import { LogoutButton } from "../LogoutButton";
import { useLayoutStore } from "./layout.store";

export function Header({ title }: { title?: React.ReactNode }) {
  const { opened, toggleSidebar } = useLayoutStore();
  return (
    <AppShell.Header>
      <Flex gap="sm" align="center" h="100%" px="md" w="100%">
        <Burger
          hiddenFrom="sm"
          size="xs"
          opened={!opened}
          onClick={toggleSidebar}
        />
        <Flex justify="space-between" align="center" w="100%">
          <Box>{title}</Box>
          <Group>
            <ThemeButton />
            <LogoutButton />
          </Group>
        </Flex>
      </Flex>
    </AppShell.Header>
  );
}
