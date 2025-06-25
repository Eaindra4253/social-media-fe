import { useAuthStore } from "@/stores/auth.store";

export function useCheckPermission(permission: string): boolean {
  const user = useAuthStore((state) => state.user);

  if (!user) return false;

  return user.permissions.includes(permission);
}
