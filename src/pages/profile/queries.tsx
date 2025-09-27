import { getProfile } from "@/services/profile.service";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile().then(res => res.data),
  });
}
