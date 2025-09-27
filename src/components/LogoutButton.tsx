import { GRAY } from "@/configs/constants";
import { useLogout } from "@/pages/auth/queries";
import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPower } from "@tabler/icons-react";

export function LogoutButton() {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    modals.openConfirmModal({
      title: "Are you sure you want to logout?",
      children: "This action will log you out of the application.",
      labels: { confirm: "Logout", cancel: "Cancel" },
      onConfirm: () => logoutMutation.mutate(),
    });
  };

  return (
    <Button
      variant="subtle"
      color= {GRAY}
      leftSection={<IconPower size={20} />}
      onClick={handleLogout}
      styles={{
        root: { padding: "4px 10px" },
      }}
    >
      Logout
    </Button>
  );
}
