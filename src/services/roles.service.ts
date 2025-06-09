import api from "@/configs/api";

export function getRoles(params?: Record<string, unknown>) {
  return api.get<ApiResponseList<Role>>("/roles", { params });
}

export function createRole(data: Record<string, unknown>) {
  return api.post("/roles", data);
}

export function updateRole(id: number, data: Record<string, unknown>) {
  return api.patch(`/roles/${id}`, data);
}
