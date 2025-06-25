import { PropsWithChildren } from "react";
import { UnauthorizedPage } from "./pages/UnauthorizePage";
import { useCheckPermission } from "@/hooks/useAuth";

type CanProps = PropsWithChildren & { permission: string };

export const Can = ({ children, permission }: CanProps) => {
  const isAuth = useCheckPermission(permission);

  if (isAuth) return children;

  return null;
};

export const AuthorizedPage = ({ children, permission }: CanProps) => {
  const isAuth = useCheckPermission(permission);

  if (isAuth) return children;

  return <UnauthorizedPage />;
};
