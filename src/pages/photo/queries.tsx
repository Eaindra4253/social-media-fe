import { photoKeys } from "@/configs/queryKeys";
import { useParamsHelper } from "@/hooks/useParamHelper";
import { deletePhoto, getPhotos, uploadPhoto } from "@/services/photo.service";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetPhotos() {
  const { getParam } = useParamsHelper();

  const params = {
    page: getParam("page") ?? 1,
    limit: getParam("limit") ?? 10,
    type: getParam("type") ?? undefined,
    outletType: getParam("outletType") ?? undefined,
  };

  return useQuery({
    queryKey: photoKeys.list(JSON.stringify(params)),
    queryFn: () => getPhotos(params),
    select: (data) => data.data,
  });
}

export function useUploadPhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => uploadPhoto(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: photoKeys.all });
      notifications.show({
        color: "green",
        title: "Success",
        icon: <IconCheck />,
        message: "Image Upload Successfully",
      });
    },
    onError: () =>
      notifications.show({
        color: "red",
        title: "Error",
        icon: <IconCheck />,
        message: "Image Upload Failed",
      }),
  });
}

export function useDeletePhoto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePhoto(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: photoKeys.all });
      notifications.show({
        color: "green",
        title: "Success",
        icon: <IconCheck />,
        message: "Image Delete Successfully",
      });
    },
    onError: () =>
      notifications.show({
        color: "red",
        title: "Error",
        icon: <IconCheck />,
        message: "Image Delete Failed",
      }),
  });
}
