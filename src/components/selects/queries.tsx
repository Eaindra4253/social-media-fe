import { photoKeys } from "@/configs/queryKeys";
import { getPhotos } from "@/services/photo.service";
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
