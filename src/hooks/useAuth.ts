import { useAuthStore } from "@/stores/auth.store";

export function useCheckActions(userRole: "ADMIN" | "SCANNER"): boolean {
  const role = useAuthStore((state) => state.user?.role);

  if (!role) return false;

  return role === userRole;
}
