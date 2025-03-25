import { useCheckActions } from "@/hooks/useAuth";

export function Can({
  children,
  userRole,
  condition = true,
  notAllowComponent,
}: {
  children: React.ReactNode;
  userRole: "ADMIN" | "SCANNER";
  condition?: boolean;
  notAllowComponent?: React.ReactNode;
}) {
  const isAllowed = useCheckActions(userRole);

  if (isAllowed && condition) return <>{children}</>;

  if (notAllowComponent) return notAllowComponent;

  return null;
}
