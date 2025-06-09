import { permissionKeys } from "@/configs/queryKeys";
import { useParamsHelper } from "@/hooks/useParamHelper";
import {
  createPermission,
  getPermissions,
  updatePermission,
} from "@/services/permission.service";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetPermissions() {
  const { getParam } = useParamsHelper();

  const params = {
    page: getParam("page") ?? 1,
    limit: getParam("limit") ?? 10,
  };

  return useQuery({
    queryKey: permissionKeys.list(JSON.stringify(params)),
    queryFn: () => getPermissions(params),
    select: (data) => data.data,
  });
}

export function useGetPermissionSelect() {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: () => getPermissions().then((res) => res.data),
    select: (data) => {
      const items = data.data ?? [];
      return items.map((perm) => ({
        value: perm.id.toString(),
        label: perm.name,
      }));
    },
  });
}

export function useCreatePermission() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) => createPermission(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: permissionKeys.all });
      notifications.show({
        color: "green",
        title: "Success",
        icon: <IconCheck />,
        message: "User Created Successfully",
      });
    },
    onError: () =>
      notifications.show({
        color: "red",
        title: "Error",
        icon: <IconCheck />,
        message: "User Creation Failed",
      }),
  });
}

export function useUpdatePermission(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, unknown>) =>
      updatePermission(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: permissionKeys.all });
      notifications.show({
        color: "green",
        title: "Success",
        icon: <IconCheck />,
        message: "Permission Updated Successfully",
      });
    },
    onError: () =>
      notifications.show({
        color: "red",
        title: "Error",
        icon: <IconCheck />,
        message: "Permission Update Failed",
      }),
  });
}
