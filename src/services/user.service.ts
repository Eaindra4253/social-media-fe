import api from "@/configs/api";

export function getUsers(params?: Record<string, unknown>) {
  return api.get<ApiResponseList<User>>("/system-users", { params });
}

export function createUser(data: Record<string, unknown>) {
  return api.post("/system-users", data);
}

export function updateUser(id: number, data: Record<string, unknown>) {
  return api.put(`/system-users/${id}`, data);
}
