import api from "@/configs/api";

export function getPermissions(params?: Record<string, unknown>) {
  return api.get<ApiResponseList<Permission>>("/permission", { params });
}

export function createPermission(data: Record<string, unknown>) {
  return api.post("/permission", data);
}

export function updatePermission(id: number, data: Record<string, unknown>) {
  return api.put(`/permission/${id}`, data);
}
