import Logo from "@/assets/logo.png";
import { useLayoutStore } from "@/components/DashboardLayout/layout.store";
import { HEADER_HEIGHT } from "@/configs/constants";
import { permissions } from "@/configs/permissions";
import { useAuthStore } from "@/stores/auth.store";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Burger,
  Center,
  Flex,
  HoverCard,
  Image,
  NavLink,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { Link, useLocation } from "react-router";
import { SidebarMenuItemType, SidebarMenuType } from "./types";

const SideBarMenuItem = ({
  label,
  icon,
  path,
  children,
  isRoot = false,
}: SidebarMenuItemType) => {
  const location = useLocation();

  const active =
    location.pathname === path ||
    (children && children.some((item) => item.path === location.pathname));

  const { opened, toggleSidebar } = useLayoutStore((state) => state);

  if (opened) {
    return (
      <HoverCard
        shadow="md"
        position="right-start"
        withArrow
        offset={16}
        arrowOffset={20}
      >
        <HoverCard.Target>
          {isRoot ? (
            <Center py={4}>
              <ActionIcon
                color={active ? "primary" : "gray"}
                variant="transparent"
                title={label}
                component={Link}
                to={path ?? "#"}
              >
                {icon}
              </ActionIcon>
            </Center>
          ) : (
            <NavLink
              active={children ? false : active}
              miw={180}
              label={label}
              title={label}
              component={Link}
              to={path!}
              rightSection={children ? ">" : undefined}
            />
          )}
        </HoverCard.Target>
        <HoverCard.Dropdown p="0">
          <Stack gap={2}>
            {children?.map((item) => (
              <SideBarMenuItem key={item.label} {...item} />
            ))}
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>
    );
  }

  if (children) {
    return (
      <NavLink
        variant="subtle"
        childrenOffset={0}
        label={label}
        leftSection={icon}
        to={path!}
        component={Link}
        defaultOpened={children.some((item) => item.path === location.pathname)}
      >
        <Stack gap={2}>
          {children.map((item) => (
            <SideBarMenuItem key={item.label} {...item} />
          ))}
        </Stack>
      </NavLink>
    );
  }

  return (
    <>
      <NavLink
        variant="subtle"
        visibleFrom="sm"
        active={active}
        label={label}
        title={label}
        leftSection={icon ?? <Box w={16} />}
        to={path!}
        component={Link}
      />
      <NavLink
        classNames={{
          root: "sidebar-menu-item",
        }}
        variant="subtle"
        hiddenFrom="sm"
        onClick={toggleSidebar}
        active={active}
        label={label}
        title={label}
        leftSection={icon ?? <Box w={16} />}
        to={path!}
        component={Link}
      />
    </>
  );
};

export function SideBar({ menus }: { menus: SidebarMenuType[] }) {
  const { opened, toggleSidebar } = useLayoutStore();
  const user = useAuthStore((state) => state.user);
  const allowedMenus = permissions[user?.role ?? "ADMIN"];

  return (
    <AppShell.Navbar>
      <AppShell.Section px="xs" py="xs" h={HEADER_HEIGHT}>
        <Flex
          justify={!opened ? "space-between" : "center"}
          align="center"
          h="100%"
        >
          {!opened && (
            <Flex gap="xs" align="center">
              <Avatar size="md" bg="primary.0">
                <Image src={Logo} width={24} height={24} />
              </Avatar>
              <Text>Coupon ADMIN</Text>
            </Flex>
          )}
          <Burger size="xs" onClick={toggleSidebar} />
        </Flex>
      </AppShell.Section>
      <AppShell.Section grow my="xs" px="xs" component={ScrollArea}>
        <Stack gap={2}>
          {menus
            .filter((x) => x.path && allowedMenus.includes(x.path))
            .map((item) => (
              <SideBarMenuItem isRoot key={item.label} {...item} />
            ))}
        </Stack>
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
