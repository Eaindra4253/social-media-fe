import { Group, Text, Avatar } from "@mantine/core";
import {
  IconHome,
  IconUser,
  IconSquareLetterSFilled,
} from "@tabler/icons-react";
import { useLocation, Link } from "react-router-dom";
import { LogoutButton } from "@/components/LogoutButton";

interface Props {
  userName?: string;
  avatarUrl?: string; 
}

export const Header = ({ userName, avatarUrl }: Props) => {
  const location = useLocation();
  const isHome = location.pathname === "/home" || location.pathname === "/";
  const isProfile = location.pathname === "/profile";

  return (
    <Group
      justify="space-around" 
      px="md" 
      py="sm" 
      style={{ borderBottom: "1px solid #e0e0e0" }}
    >
      <Group>
        <Group>
          <IconSquareLetterSFilled size={20} />
          <Text fw={700} size="xl">
            Social
          </Text>
        </Group>

        <Group gap="xs">
          <Link to="/home" style={{ textDecoration: "none" }}>
            <Group
              gap="xs"
              px="sm"
              py={4}
              style={{
                borderRadius: 6,
                backgroundColor: isHome ? "black" : "transparent",
                cursor: "pointer",
              }}
            >
              <IconHome size={18} color={isHome ? "white" : "gray"} />
              <Text c={isHome ? "white" : "dimmed"}>Home</Text>
            </Group>
          </Link>

          <Link to="/profile" style={{ textDecoration: "none" }}>
            <Group
              gap="xs"
              px="sm"
              py={4}
              style={{
                borderRadius: 6,
                backgroundColor: isProfile ? "black" : "transparent",
                cursor: "pointer",
              }}
            >
              <IconUser size={18} color={isProfile ? "white" : "gray"} />
              <Text c={isProfile ? "white" : "dimmed"}>Profile</Text>
            </Group>
          </Link>
        </Group>
      </Group>

      <Group>
        <Avatar src={avatarUrl || "https://via.placeholder.com/150"} radius="xl" />
        <Text>{userName || "User"}</Text>
        <LogoutButton />
      </Group>
    </Group>
  );
};