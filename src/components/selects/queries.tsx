import { permissionKeys, photoKeys, roleKeys } from "@/configs/queryKeys";
import { getPermissions } from "@/services/permission.service";
import { getPhotos } from "@/services/photo.service";
import { getRoles } from "@/services/roles.service";
import { useAuthStore } from "@/stores/auth.store";
import { useQuery } from "@tanstack/react-query";

export function useGetPhotos(type?: "LOGO" | "THUMBNAIL" | "IMAGE_URL") {
  const user = useAuthStore((state) => state.user);
  const params = {
    type,
    outletType: user?.outletType,
  };

  return useQuery({
    queryKey: photoKeys.list(JSON.stringify(params)),
    queryFn: () => getPhotos(params),
    select: (data) =>
      data.data.data.map((item) => ({ label: item.filename, value: item.url })),
  });
}

export function useGetRolesSelect() {
  return useQuery({
    queryKey: roleKeys.lists(),
    queryFn: () => getRoles().then((res) => res.data),
    select: (data) => {
      const items = data.data ?? [];
      return items.map((perm) => ({
        value: perm.name,
        label: perm.name,
      }));
    },
  });
}

export function useGetPermissionSelect() {
  return useQuery({
    queryKey: permissionKeys.lists(),
    queryFn: () => getPermissions().then((res) => res.data),
    select: (data) => {
      const items = data.data ?? [];
      return items.map((perm) => ({
        value: perm.code,
        label: perm.name,
      }));
    },
  });
}
