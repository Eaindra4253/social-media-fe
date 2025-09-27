import api from "@/configs/api";

export function getProfile() {
  return api.get("/profile");
}
