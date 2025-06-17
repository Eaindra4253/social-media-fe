import { useAuthStore } from "@/stores/auth.store";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconX } from "@tabler/icons-react";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  timeout: 5 * 60 * 1000,
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
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response && error.response.status === 401) {
      if (error.response.config.url?.includes("login")) {
        notifications.show({
          id: "unauthorized",
          title: "Unauthorized",
          message: error.response.data.message,
          color: "red",
          icon: <IconX size={16} />,
        });
      } else {
        console.log(error.response.data);
        const clearUser = useAuthStore.getState().logout;
        clearUser();

        notifications.show({
          id: "session-expired",
          title: "Session Expired",
          message: "Please login again",
          color: "red",
          icon: <IconAlertCircle size={16} />,
        });
      }
    }
    return Promise.reject(error);
  }
);

export default api;
