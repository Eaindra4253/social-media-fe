import api from "@/configs/api";

export function getSetting() {
  return api.get<Settings>("/system-environment");
}

export function updateSetting(data: Record<string, unknown>) {
  return api.post<Settings>("/system-environment", data);
}
