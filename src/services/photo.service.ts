import api from "@/configs/api";

export function getPhotos(params?: Record<string, unknown>) {
  return api.get<Image[]>("/images", { params });
}
