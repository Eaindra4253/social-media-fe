import api from "@/configs/api";

export function getPhotos() {
  return api.get<Image[]>("/images");
}
