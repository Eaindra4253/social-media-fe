import { Header } from "@/components/DashboardLayout";
import { HEADER_HEIGHT } from "@/configs/constants";
import { useAuthStore } from "@/stores/auth.store";
import { AppShell } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";

export function ScannerLayout() {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "ADMIN") return <Navigate to="/" replace />;

  return (
    <AppShell header={{ height: HEADER_HEIGHT }}>
      <Header />
      <Outlet />
    </AppShell>
  );
}
