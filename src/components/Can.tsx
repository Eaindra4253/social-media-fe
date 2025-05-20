import { permissions } from "@/configs/permissions";
import { useAuthStore } from "@/stores/auth.store";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const Can = ({
  children,
  roles,
}: PropsWithChildren & { roles: string[] }) => {
  const user = useAuthStore((state) => state.user);

  if (roles.includes(user!.role)) {
    return children;
  }

  return <Navigate to={permissions[user!.role][0]} />;
};
