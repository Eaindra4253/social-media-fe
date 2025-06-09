import { useAuthStore } from "@/stores/auth.store";
import { PropsWithChildren } from "react";
import { UnauthorizedPage } from "./pages/UnauthorizePage";

type CanProps = PropsWithChildren & { permission: string };

export const Can = ({ children, permission }: CanProps) => {
  const user = useAuthStore((state) => state.user);

  if (user?.permissions.includes(permission)) return children;

  return null;
};

export const AuthorizedPage = ({ children, permission }: CanProps) => {
  const user = useAuthStore((state) => state.user);

  if (user?.permissions.includes(permission)) return children;

  return <UnauthorizedPage />;
};
