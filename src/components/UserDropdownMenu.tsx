import { useAuthStore } from "@/stores/auth.store";
import { Menu, Avatar, MenuDivider, Text } from "@mantine/core";
import { LogoutButton } from "./LogoutButton";

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
        <LogoutButton />
      </Menu.Dropdown>
    </Menu>
  );
}
