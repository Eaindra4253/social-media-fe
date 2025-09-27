import api from "@/configs/api";

export function login(data: Record<string, unknown>) {
  return api.post<LoginResponse>("/login", data);
}

export function register(data: Record<string, unknown>) {
  return api.post<LoginResponse>("/register", data);
}

export function logout() {
  return api.post<{ message: string }>("/logout");
}
