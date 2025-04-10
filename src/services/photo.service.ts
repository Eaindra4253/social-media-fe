import api from "@/configs/api";

export function getPhotos(params?: Record<string, unknown>) {
  return api.get<ApiResponseList<Image>>("/images", { params });
}

export function uploadPhoto(data: FormData) {
  return api.post<Image>("/images/upload", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function deletePhoto(id: number) {
  return api.delete<void>(`/images/${id}`);
}
