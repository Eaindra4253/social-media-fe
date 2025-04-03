import { Header } from "@/components/DashboardLayout";
import { HEADER_HEIGHT } from "@/configs/constants";
import { useAuthStore } from "@/stores/auth.store";
import { AppShell } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";

export function SystemUserLayout() {
  const user = useAuthStore((state) => state.user);

  console.log(user);

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "ADMIN") return <Navigate to="/system-user" />;

  return (
    <AppShell header={{ height: HEADER_HEIGHT }}>
      <Header />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
