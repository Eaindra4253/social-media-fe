import api from "@/configs/api";

export function login(data: Record<string, unknown>) {
  return api.post<LoginResponse>("/admin/login", data);
}
