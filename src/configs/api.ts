import { useAuthStore } from "@/stores/auth.store";
import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {},
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const { user } = useAuthStore.getState();

    if (user?.accessToken) {
      config.headers["Authorization"] = `Bearer ${user.accessToken}`;
      config.headers["Accept"] = "application/json";
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json; charset=utf-8";
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
