import api from "@/configs/api";

export function getPermissions(params?: Record<string, unknown>) {
  return api.get<ApiResponseList<Permission>>("/permissions", { params });
}

export function createPermission(data: Record<string, unknown>) {
  return api.post("/permissions", data);
}

export function updatePermission(id: number, data: Record<string, unknown>) {
  return api.put(`/permissions/${id}`, data);
}
