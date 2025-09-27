import { login, logout, register } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  return useMutation({
    mutationFn: (data: Record<string, unknown>) => login(data),
    onSuccess: (response) => {
      setAuthUser(response.data as LoginResponse);

      notifications.show({
        id: "login-success",
        color: "green",
        title: "Success",
        message: "Login successful",
        icon: <IconCheck />,
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ?? error?.message ?? "Login failed";
      notifications.show({
        id: "login-error",
        color: "red",
        title: "Error",
        message,
        icon: <IconX />,
      });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => register(data),
    onSuccess: () => {
      notifications.show({
        id: "register-success",
        color: "green",
        title: "Success",
        message: "Registration successful",
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Registration failed";
      notifications.show({
        id: "register-error",
        color: "red",
        title: "Error",
        message,
      });
    },
  });
}

export function useLogout() {
  const removeAuthUser = useAuthStore((state) => state.removeAuthUser);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      removeAuthUser();
      navigate("/login");
      notifications.show({
        id: "logout-success",
        color: "green",
        title: "Logged out",
        message: "You have been logged out successfully",
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ?? error?.message ?? "Logout failed";
      notifications.show({
        id: "logout-error",
        color: "red",
        title: "Error",
        message,
      });
    },
  });
}
