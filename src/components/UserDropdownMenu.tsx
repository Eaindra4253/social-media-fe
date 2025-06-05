import { useAuthStore } from "@/stores/auth.store";
import {
  Menu,
  Avatar,
  MenuDivider,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { LogoutButton } from "./LogoutButton";
import { IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";

function UserAvatar() {
  const user = useAuthStore((state) => state?.user);
  return (
    <Avatar size={30} variant="filled">
      {user?.username?.charAt(0)}
    </Avatar>
  );
}

export function UserDropdownMenu() {
  const user = useAuthStore((state) => state?.user);
  const theme = useMantineTheme();

  return (
    <Menu shadow="lg" width={250}>
      <Menu.Target>
        <span>
          <UserAvatar />
        </span>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<UserAvatar />}>
          <Text fw="bold" fz="sm">
            {user?.username}
          </Text>
        </Menu.Item>
        <MenuDivider />
        <Menu.Item
          c="orange"
          leftSection={<IconLock size={20} color={theme.colors.orange[6]} />}
          component={Link}
          to={"/change-password"}
        >
          Change Password
        </Menu.Item>
        <LogoutButton />
      </Menu.Dropdown>
    </Menu>
  );
}
