import { ThemeButton } from "@/components/ThemeButton";
import { AppShell, Box, Burger, Flex, Group } from "@mantine/core";
import { useLayoutStore } from "./layout.store";
import { UserDropdownMenu } from "../UserDropdownMenu";
import { useAuthStore } from "@/stores/auth.store";

export function Header({ title }: { title?: React.ReactNode }) {
  const { opened, toggleSidebar } = useLayoutStore();
  const user = useAuthStore((state) => state.user);
  
  const isScanner = user?.role === "SCANNER";

  return (
    <AppShell.Header>
      <Flex gap="sm" align="center" h="100%" px="md" w="100%">
        {!isScanner && (
          <Burger
            hiddenFrom="sm"
            size="xs"
            opened={!opened}
            onClick={toggleSidebar}
          />
        )}
        <Flex justify="space-between" align="center" w="100%">
          <Box>{title}</Box>
          <Group>
            <ThemeButton />
            <UserDropdownMenu />
          </Group>
        </Flex>
      </Flex>
    </AppShell.Header>
  );
}
