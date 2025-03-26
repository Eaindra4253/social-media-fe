import { photoKeys } from "@/configs/queryKeys";
import { getPhotos, uploadPhoto, deletePhoto } from "@/services/photo.service";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useGetPhotos() {
  return useQuery({
    queryKey: photoKeys.all,
    queryFn: () => getPhotos(),
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
